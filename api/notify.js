import { guard, getClientIp } from './_lib/guard.js';

const MAX_NAME_LENGTH = 30;
const MAX_CONTENT_LENGTH = 800;
const consultationTypes = new Set([
  '产品咨询',
  '方案定制',
  '售后支持',
  '价格询价',
  '上门部署',
  '其他',
]);

const ERROR_MESSAGES = {
  zh: { required: '请填写姓名、联系电话和咨询内容', phone: '联系电话格式不正确' },
  en: { required: 'Please enter your name, phone number and inquiry.', phone: 'Please enter a valid phone number.' },
  ja: { required: 'お名前、電話番号、お問い合わせ内容を入力してください。', phone: '有効な電話番号を入力してください。' },
};

// 表单提交频率天然很低，按天限流
const RATE_LIMIT = { name: 'notify', limit: 5, windowMs: 24 * 60 * 60 * 1000, globalLimit: 100 };

// 真人填完姓名、电话、需求至少要十几秒，3 秒内提交的基本是脚本。
// 注意：renderedAt 由前端提供，可被伪造 —— 这只挡粗糙的自动化，
// 挡不住专门针对本站构造请求的人。配合蜜罐和限流一起用。
const MIN_FILL_MS = 3000;

const json = (res, status, body) => res.status(status).json(body);

const cleanText = (value, maxLength) =>
  String(value || '')
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('')
    .replace(/[<>[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const normalizePhone = (value) =>
  String(value || '').replace(/[^\d+]/g, '').trim();

export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const blocked = guard(req, RATE_LIMIT);
  if (blocked) {
    if (blocked.headers) {
      for (const [key, value] of Object.entries(blocked.headers)) res.setHeader(key, value);
    }
    return json(res, blocked.status, blocked.body);
  }

  // 蜜罐字段：页面上视觉隐藏，真人不会填，批量脚本会把所有字段填满。
  // 命中后返回成功而非报错，避免脚本据此调整策略。
  if (String(req.body?.fax || '').trim()) {
    return json(res, 200, { ok: true });
  }

  const renderedAt = Number(req.body?.renderedAt);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    return json(res, 200, { ok: true });
  }

  const name = cleanText(req.body?.name, MAX_NAME_LENGTH);
  const phone = normalizePhone(req.body?.phone);
  const type = consultationTypes.has(req.body?.type) ? req.body.type : '其他';
  const content = cleanText(req.body?.content, MAX_CONTENT_LENGTH);
  const errors = ERROR_MESSAGES[req.body?.language] || ERROR_MESSAGES.zh;

  if (!name || !phone || !content) {
    return json(res, 400, { error: errors.required });
  }

  if (!/^\+?\d{8,15}$/.test(phone)) {
    return json(res, 400, { error: errors.phone });
  }

  const webhookUrl = process.env.WECOM_WEBHOOK_URL;

  if (!webhookUrl) {
    return json(res, 500, { error: 'Webhook not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: {
          content: `**新咨询通知**\n\n> **姓名：**${name}\n> **电话：**${phone}\n> **类型：**${type}\n> **内容：**${content}\n\n---\n来自：${req.headers.host || '官网'}
> IP：${getClientIp(req)}
> 时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('WeCom webhook failed:', response.status, text);
      return json(res, 500, { error: 'Webhook failed' });
    }

    // 企业微信把业务错误放在 200 响应体里：key 失效、机器人被删、超出发送
    // 频率限制，都是 HTTP 200 + errcode != 0。只看状态码会把这些当成成功，
    // 客户看到「提交成功」而群里什么都没有，线索就静默丢了。
    // 响应体解析不出来也按失败处理：宁可让客户重试一次（可能多出一条重复
    // 消息），也不要在其实没送达时告诉他已经收到。
    const result = await response.json().catch(() => null);

    if (!result || result.errcode !== 0) {
      console.error('WeCom webhook rejected:', result?.errcode, result?.errmsg);
      return json(res, 500, { error: 'Webhook rejected' });
    }

    return json(res, 200, { success: true });
  } catch (err) {
    console.error('Notify failed:', err);
    return json(res, 500, { error: 'Notify failed' });
  }
}
