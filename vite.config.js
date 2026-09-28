import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/data/domain.js'

// index.html 里的 %SITE_URL% 占位符在构建时替换为规范域名（见 src/data/domain.js）。
// 阿里云和 Vercel 两份产物因此完全相同，canonical 都指向主域名 youzhiyes.com。
const siteUrlPlugin = () => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  // 路由切换时要重写 canonical 与 og:url，运行时也得知道规范域名。
  // 不用 location.origin：备用站和预览域名都会把 canonical 指错。
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  build: {
    // 预渲染（scripts/prerender.mjs）靠 manifest 找到每个页面的 chunk 写 modulepreload，用完即删
    manifest: true,
    rollupOptions: {
      output: {
        // 框架单独成块：它几乎不变，发版后浏览器可以继续用缓存里的那一份。
        // rolldown 只接受函数形式的 manualChunks，不能用对象。
        manualChunks: (id) =>
          /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)
            ? 'vendor'
            : undefined,
      },
    },
  },
})
