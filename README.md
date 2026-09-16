# 北京友质科技官网

Vite + React 官网项目，包含产品目录、企业级存储、品牌动态、联系方式与咨询表单。

## 本地开发

```bash
npm install
npm run dev
```

## 环境变量

复制 `.env.example` 到 `.env.local`，按需填写：

- `WECOM_WEBHOOK_URL`：企业微信机器人 Webhook，用于接收咨询表单。
- `ALLOWED_ORIGINS`：可选。`/api/*` 默认只放行与站点同源的请求（自定义域名和 Vercel 预览域名都自动生效），需要额外放行其它域名时在这里填，逗号分隔。

## 接口防护

`/api/notify` 做了来源校验和速率限制（见 `api/_lib/guard.js`）：

- `/api/notify`：每 IP 每天 5 次，单函数实例每天 100 次

限流计数保存在函数实例内存中，Vercel 扩容出多个实例时实际上限会成倍放大，
目的是挡住脚本刷量。若后续需要严格配额，应改用 Upstash / Vercel KV 等共享存储。

## 产品图片

产品图放在 `public/products/` 下，文件名与 `src/data/products.js` 中的 `image` 字段对应（如 `zspace-q2c.jpg`）。有图的产品自动显示图片，缺图或加载失败时自动回退为占位符。

## SEO 文件

`public/sitemap.xml` 与 `public/robots.txt` 都由 `scripts/generate-seo.js` 生成
（sitemap 的产品条目取自 `src/data/products.js`），已挂在 `prebuild` 钩子上，
每次 `npm run build`（含 Vercel 部署）都会重新生成，新增产品无需手动同步。
两个文件都含绝对域名，所以必须随构建生成，不能当静态文件手工维护。

站点域名默认取 `https://www.bjyzyes.com`，可用 `SITE_URL` 环境变量覆盖。

## 常用命令

```bash
npm run lint
npm test
npm run build
```
