import { guard } from './_lib/guard.js';

const DEFAULT_BASE_URL = 'https://api.moonshot.cn/v1';
const DEFAULT_MODEL = 'moonshot-v1-8k';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

// AI 调用直接消耗 API 额度，限流收得比表单更紧
const RATE_LIMIT = { name: 'chat', limit: 20, windowMs: 60 * 60 * 1000, globalLimit: 200 };

const SYSTEM_PROMPT = [
  '你是北京友质科技有限公司的在线客服。',
  '',
  '【公司信息】',
  '主营：机械硬盘、固态硬盘、NAS 私有云、存储配件。',
  '服务：方案定制、北京地区上门部署、售后维保、云迁移。',
  '地址：北京市海淀区知春路113号银网中心8层808室。',
  '电话：133-0133-5226（周一至周五 09:00-18:00）。',
  '邮箱：contact@bjyzyes.com。',
  '',
  '【回答风格】简明高效。',
  '先给结论，再补一句关键理由，然后停。',
  '控制在 150 字以内，最多 3 个自然段，段与段之间空一行。',
  '不寒暄、不复述问题、不在结尾重复公司介绍。',
  '缺少推荐所需的关键信息时，每轮最多反问一个问题。',
  '',
  '【格式要求】只输出纯文本。',
  '禁止使用 Markdown：不要 **加粗**、# 标题、- 列表、表格或代码块。',
  '前端按纯文本渲染，这些符号会原样显示给用户。',
  '需要并列时用顿号或换行，不要用符号列表。',
  '',
  '【边界】',
  '实时价格、库存、质保细则、上门排期不要编造，直接说需要确认，并引导用户留电话或拨打 133-0133-5226。',
  '不确定的产品参数如实说不确定，不要猜。',
  '与存储、硬盘、NAS 及本公司业务无关的问题，一句话礼貌带回业务话题。',
].join('\n');

const LANGUAGE_INSTRUCTIONS = {
  zh: '请使用简体中文回答。',
  en: 'Reply in English.',
  ja: '日本語で回答してください。',
};

const json = (res, status, body) => res.status(status).json(body);

const cleanText = (value, maxLength = MAX_MESSAGE_LENGTH) =>
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

// 清理 AI 回复：去掉控制字符但保留换行，前端按 pre-wrap 渲染分段
const cleanReply = (value, maxLength) =>
  String(value || '')
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (char === '\n') return char;
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);

const normalizeMessages = (messages) => {
  if (!Array.isArray(messages)) return [];

  return messages
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message?.role === 'assistant' ? 'assistant' : 'user',
      content: cleanText(message?.content),
    }))
    .filter((message) => message.content);
};

export default async function handler(req, res) {
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

  const apiKey = process.env.MOONSHOT_API_KEY || process.env.KIMI_API_KEY;
  if (!apiKey) {
    return json(res, 501, { error: 'AI assistant not configured' });
  }

  const messages = normalizeMessages(req.body?.messages);
  if (messages.length === 0) {
    return json(res, 400, { error: 'Missing messages' });
  }

  const baseUrl = process.env.KIMI_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.KIMI_MODEL || DEFAULT_MODEL;
  const languageInstruction = LANGUAGE_INSTRUCTIONS[req.body?.language] || LANGUAGE_INSTRUCTIONS.zh;

  try {
    const requestBody = {
      model,
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}\n${languageInstruction}` },
        ...messages,
      ],
      temperature: 0.35,
      max_tokens: 800,
    };
    // K2.x 模型默认开启思考，客服场景要求快速简短回复，关闭思考降低延迟与成本
    if (/^kimi-k2/.test(model)) {
      requestBody.thinking = { type: 'disabled' };
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Kimi API failed:', response.status, detail);
      return json(res, 502, { error: 'AI service unavailable' });
    }

    const data = await response.json();
    const reply = cleanReply(data.choices?.[0]?.message?.content, 2000);

    if (!reply) {
      return json(res, 502, { error: 'Empty AI response' });
    }

    return json(res, 200, { reply });
  } catch (err) {
    console.error('AI chat failed:', err);
    return json(res, 500, { error: 'AI request failed' });
  }
}
