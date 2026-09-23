import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { findPageRoute, preloadRoute } from './routes'
import { beginHydration } from './utils/hydration'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// data-route 记着这份静态 HTML 是哪个地址预渲染出来的（见 scripts/prerender.mjs）。
// 对得上才 hydrate；对不上就整块重画 —— 例如服务器还没更新配置、把首页 HTML
// 当回退返回给了 /products，硬 hydrate 只会得到一串不匹配错误。
// 开发环境没有预渲染，data-route 为空，直接走 createRoot。
const canHydrate = (prerendered, pathname) =>
  prerendered === pathname || (prerendered === '404' && !findPageRoute(pathname))

const { pathname } = window.location

// 先把当前页面的 chunk 拉下来（预渲染的 HTML 里已经 modulepreload 过，通常是现成的），
// 首屏渲染就不会挂起，hydrate 能一次完成。
preloadRoute(pathname)
  .catch(() => {
    // 分块加载失败时照常渲染，由 Suspense 兜底重试
  })
  .then(() => {
    if (canHydrate(container.dataset.route, pathname)) {
      beginHydration()
      hydrateRoot(container, app)
    } else {
      createRoot(container).render(app)
    }
  })
