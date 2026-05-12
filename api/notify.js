export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, type, content } = req.body;

  if (!name || !phone || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const webhookUrl = process.env.WECOM_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: {
          content: `**📝 新咨询通知**\n\n> **姓名：**${name}\n> **电话：**${phone}\n> **类型：**${type}\n> **内容：**${content}\n\n---\n来自：bjyzyes.com 官网`,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Webhook failed', detail: text });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
