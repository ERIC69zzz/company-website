import { writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = 'https://vapi.zenithspace.net/api/v1/content/contentmedia/list?pageIndex=1&pageSize=9';
const OUTPUT_FILE = join(__dirname, '..', 'src', 'data', 'zspace-news.json');

// GitHub 的 runner 在海外，连国内接口时不时在建连阶段就失败（fetch failed）：
// 2026 年 8–10 月 12 次定时运行里失败了 5 次，每次都是一次请求不通就整周放弃。
// 隔一会儿重试通常就通了。
const ATTEMPT_TIMEOUT_MS = 20000;
const RETRY_DELAYS_MS = [5000, 15000, 30000];

const MAX_TITLE_LENGTH = 200;
const MAX_DESC_LENGTH = 500;

// 上游 API 的返回会被自动提交并渲染成官网上的链接，
// 因此只接受 http/https，挡掉 javascript: 等危险协议。
const safeUrl = (value) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : '';
  } catch {
    return '';
  }
};

const safeText = (value, maxLength) =>
  String(value || '')
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// fetch failed 本身不说明原因，真正的原因（ECONNRESET、ETIMEDOUT、证书问题）在 cause 里
const describe = (err) => {
  const cause = err.cause?.code || err.cause?.message;
  return cause ? `${err.message}（${cause}）` : err.message;
};

async function requestOnce() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();

    if (data.code !== 200 || !data.data?.list) {
      throw new Error(`API error: ${data.msg || 'unknown'}`);
    }
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function requestWithRetry() {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await requestOnce();
    } catch (err) {
      const delay = RETRY_DELAYS_MS[attempt];
      if (delay === undefined) throw err;
      console.warn(`⚠️ 第 ${attempt + 1} 次请求失败: ${describe(err)}，${delay / 1000} 秒后重试`);
      await sleep(delay);
    }
  }
}

async function fetchNews() {
  try {
    const data = await requestWithRetry();

    const news = data.data.list
      .map((item) => ({
        id: item.id,
        title: safeText(item.title, MAX_TITLE_LENGTH),
        desc: safeText(item.content, MAX_DESC_LENGTH),
        url: safeUrl(item.url),
        media: safeText(item.from_media, 50),
        date: safeText(item.createdAt, 30).split('T')[0] || '',
      }))
      // 丢弃标题或链接不合法的条目，避免官网出现空链接卡片
      .filter((item) => item.title && item.url);

    writeFileSync(OUTPUT_FILE, JSON.stringify(news, null, 2) + '\n', 'utf-8');
    console.log(`✅ 成功抓取 ${news.length} 条极空间新闻`);
    return true;
  } catch (err) {
    console.error('❌ 抓取失败:', describe(err));

    // API 失败时不覆盖旧数据（如果存在）
    if (existsSync(OUTPUT_FILE)) {
      console.log('ℹ️ 保留旧数据不覆盖');
    } else {
      // 首次运行且失败，写入空数组避免构建报错
      writeFileSync(OUTPUT_FILE, '[]\n', 'utf-8');
    }
    return false;
  }
}

// 失败时以非 0 退出码结束，让 GitHub Actions 亮红灯并告警。
// 注意：上面的失败分支不会覆盖已有数据，这里只负责让人知道上游出了问题。
fetchNews().then((ok) => {
  if (!ok) process.exitCode = 1;
});
