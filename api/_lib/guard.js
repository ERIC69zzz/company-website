// API 端点通用防护：来源校验 + 速率限制。
// 说明：限流状态保存在函数实例内存中，Vercel 多实例并发时上限会被放大，
// 属于"挡住脚本刷量"级别的防护。若后续流量增大或出现真实攻击，
// 应换成 Upstash / Vercel KV 等共享存储。

const buckets = new Map();
const MAX_BUCKETS = 5000;

const isGlobalBucket = (key) => key.endsWith(':__global__');

const makeRoomForBucket = (now) => {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }

  if (buckets.size < MAX_BUCKETS) return;

  // Map 保持插入顺序，优先淘汰最早创建的 IP 桶，避免攻击流量
  // 把实例级总量桶挤掉并重置全局限额。
  for (const key of buckets.keys()) {
    if (!isGlobalBucket(key)) {
      buckets.delete(key);
      return;
    }
  }

  // 理论上只有创建了数千个不同 name 的全局桶才会走到这里。
  // 仍淘汰最老项，确保 MAX_BUCKETS 始终是硬上限。
  const oldestKey = buckets.keys().next().value;
  if (oldestKey) buckets.delete(oldestKey);
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
};

// 同源判断：把 Origin 的 host 与请求自身的 host 比对，
// 这样自定义域名、Vercel 预览域名都无需额外配置即可通过。
// 额外来源可用 ALLOWED_ORIGINS 环境变量配置（逗号分隔）。
const isAllowedOrigin = (req) => {
  const origin = req.headers.origin;

  // 浏览器对所有 POST 请求（含同源）都会带 Origin，缺失基本等于非浏览器客户端。
  if (!origin) return false;

  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  if (originHost === req.headers.host) return true;

  const extra = String(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return extra.some((item) => {
    try {
      return new URL(item.includes('://') ? item : `https://${item}`).host === originHost;
    } catch {
      return false;
    }
  });
};

// 固定窗口计数。返回 true 表示放行。
const takeToken = (key, limit, windowMs) => {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    if (bucket) buckets.delete(key);
    if (buckets.size >= MAX_BUCKETS) makeRoomForBucket(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
};

// 统一入口：校验通过返回 null，否则返回 { status, body, headers }
export const guard = (req, { name, limit, windowMs, globalLimit }) => {
  if (!isAllowedOrigin(req)) {
    return { status: 403, body: { error: 'Forbidden' } };
  }

  const perIp = takeToken(`${name}:${getClientIp(req)}`, limit, windowMs);
  if (!perIp.allowed) {
    return {
      status: 429,
      body: { error: '请求过于频繁，请稍后再试' },
      headers: { 'Retry-After': String(perIp.retryAfter) },
    };
  }

  // 实例级总量上限，防止攻击者切换 IP 绕过单 IP 限制
  if (globalLimit) {
    const total = takeToken(`${name}:__global__`, globalLimit, windowMs);
    if (!total.allowed) {
      return {
        status: 429,
        body: { error: '服务繁忙，请稍后再试' },
        headers: { 'Retry-After': String(total.retryAfter) },
      };
    }
  }

  return null;
};

// 仅供 node:test 验证限流边界，生产代码只使用 guard。
export const __testing = {
  maxBuckets: MAX_BUCKETS,
  bucketCount: () => buckets.size,
  hasBucket: (key) => buckets.has(key),
  reset: () => buckets.clear(),
  takeToken,
};
