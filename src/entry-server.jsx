// 构建时预渲染的入口：由 `vite build --ssr` 打包到 dist-ssr/，
// 再由 scripts/prerender.mjs 为每个路由调用 render()，生成带正文的静态 HTML。
// 搜索引擎（尤其是基本不执行 JS 的百度）和微信分享卡片读到的就是这份 HTML。
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { siteRoutes } from './data/sitemap'
import { translations } from './i18n/translations'
import { routeMeta, trimDescription } from './lib/routeMeta'
import { structuredData } from './lib/structuredData'
import { findPageRoute, notFoundModule, preloadRoute } from './routes'

export { siteRoutes }

export const SITE_URL = __SITE_URL__

// 这个地址的页面源文件，预渲染据此写 modulepreload
export const pageModule = (pathname) => {
  const route = findPageRoute(pathname)
  return route ? route.module : notFoundModule
}

export async function render(pathname) {
  // 页面 chunk 先加载好，renderToString 才不会停在 Suspense 的占位上
  await preloadRoute(pathname)

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  const copy = translations.zh
  const { title, description } = routeMeta(pathname, copy, 'zh')

  return {
    html,
    title,
    description: trimDescription(description),
    jsonLd: structuredData(pathname, SITE_URL, copy),
  }
}
