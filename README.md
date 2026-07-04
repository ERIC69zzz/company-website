# 北京友质科技官网

Vite + React 官网项目，包含产品目录、品牌动态、联系方式、咨询表单和 Kimi AI 客服。

## 本地开发

```bash
npm install
npm run dev
```

## 环境变量

复制 `.env.example` 到 `.env.local`，按需填写：

- `WECOM_WEBHOOK_URL`：企业微信机器人 Webhook，用于接收咨询表单。
- `MOONSHOT_API_KEY`：Kimi/Moonshot API Key，用于 AI 客服。
- `KIMI_BASE_URL`：Kimi OpenAI 兼容接口地址，默认 `https://api.moonshot.cn/v1`。
- `KIMI_MODEL`：Kimi 模型 ID。如果要使用 Kimiclaw 或其它可用模型，填对应模型名。

## 产品图片

产品图放在 `public/products/` 下，文件名与 `src/data/products.js` 中的 `image` 字段对应（如 `zspace-q2c.jpg`）。有图的产品自动显示图片，缺图或加载失败时自动回退为占位符。

## 常用命令

```bash
npm run lint
npm run build
```
