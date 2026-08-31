import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 站点地址由构建时的 SITE_URL 决定，使同一份代码能构建出
// 两个域名的产物（阿里云 ECS 用 youzhiyes.com，Vercel 用 bjyzyes.com）。
const SITE_URL = (process.env.SITE_URL || 'https://www.bjyzyes.com').replace(/\/+$/, '')

// index.html 里的 %SITE_URL% 占位符在构建时替换为实际域名，
// 保证 canonical、og:url、og:image 指向自身域名而非写死一个。
const siteUrlPlugin = () => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
})
