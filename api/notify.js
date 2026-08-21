import { guard } from './_lib/guard.js';

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

// 表单提交频率天然很低，按天限流
const RATE_LIMIT = { name: 'notify', limit: 5, windowMs: 24 * 60 * 60 * 1000, globalLimit: 100 };

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

  const name = cleanText(req.body?.name, MAX_NAME_LENGTH);
  const phone = normalizePhone(req.body?.phone);
  const type = consultationTypes.has(req.body?.type) ? req.body.type : '其他';
  const content = cleanText(req.body?.content, MAX_CONTENT_LENGTH);

  if (!name || !phone || !content) {
    return json(res, 400, { error: '请填写姓名、联系电话和咨询内容' });
  }

  if (!/^(\+?86)?1[3-9]\d{9}$/.test(phone) && !/^\+\d{8,15}$/.test(phone)) {
    return json(res, 400, { error: '联系电话格式不正确' });
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
          content: `**新咨询通知**\n\n> **姓名：**${name}\n> **电话：**${phone}\n> **类型：**${type}\n> **内容：**${content}\n\n---\n来自：bjyzyes.com 官网`,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('WeCom webhook failed:', response.status, text);
      return json(res, 500, { error: 'Webhook failed' });
    }

    return json(res, 200, { success: true });
  } catch (err) {
    console.error('Notify failed:', err);
    return json(res, 500, { error: 'Notify failed' });
  }
}
