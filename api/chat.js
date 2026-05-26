const DEFAULT_BASE_URL = 'https://api.moonshot.cn/v1';
const DEFAULT_MODEL = 'moonshot-v1-8k';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const SYSTEM_PROMPT = [
  '你是北京友质科技有限公司的智能客服助手。',
  '公司主营机械硬盘、固态硬盘、NAS 私有云和存储配件，服务包括方案定制、北京上门部署、售后维保和云迁移。',
  '公司地址：北京市海淀区中关村南大街甲2号数码大厦B座901。',
  '联系电话：133-0133-5226，工作时间：周一至周六 09:00-18:00。',
  '邮箱：contact@bjyzyes.com。',
  '回答要专业、简洁、偏销售咨询场景。涉及实时价格、库存、质保细则或上门排期时，不要编造，建议用户留下联系方式或拨打电话确认。',
].join('\n');

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

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.35,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Kimi API failed:', response.status, detail);
      return json(res, 502, { error: 'AI service unavailable' });
    }

    const data = await response.json();
    const reply = cleanText(data.choices?.[0]?.message?.content, 2000);

    if (!reply) {
      return json(res, 502, { error: 'Empty AI response' });
    }

    return json(res, 200, { reply });
  } catch (err) {
    console.error('AI chat failed:', err);
    return json(res, 500, { error: 'AI request failed' });
  }
}
