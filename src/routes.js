import { lazy } from 'react';
import { matchPath } from 'react-router-dom';

// 已加载过的页面走同步 thenable：React.lazy 拿到当场兑现的结果就直接渲染，不挂起。
// 预渲染和首屏 hydrate 都靠这一点 —— 页面一挂起，hydrate 会留下一块「脱水」的
// Suspense 边界，随后的切语言等更新一碰到它，整块就退回客户端渲染，先闪白再出内容。
function lazyPage(load) {
  let loaded = null;
  const preload = () => load().then((module) => {
    loaded = module;
    return module;
  });
  const Page = lazy(() => (loaded ? { then: (resolve) => resolve(loaded) } : preload()));
  Page.preload = preload;
  return Page;
}

// 首页随主包加载（它是着陆页），其余路由按需拉取自己的 chunk。
export const ProductsPage = lazyPage(() => import('./pages/ProductsPage'));
export const EnterprisePage = lazyPage(() => import('./pages/EnterprisePage'));
export const EnterpriseProductPage = lazyPage(() => import('./pages/EnterpriseProductPage'));
export const ProductDetailPage = lazyPage(() => import('./pages/ProductDetailPage'));
export const BrandPage = lazyPage(() => import('./pages/BrandPage'));
export const ContactPage = lazyPage(() => import('./pages/ContactPage'));
export const ConsultPage = lazyPage(() => import('./pages/ConsultPage'));
export const PrivacyPage = lazyPage(() => import('./pages/PrivacyPage'));
export const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'));

// 与 App.jsx 里 <Routes> 的 path 一一对应（tests/prerender.test.js 会比对）。
// 首页不在按需加载之列，页面为 null。
// module 是页面的源文件，预渲染据此在 Vite 的 manifest 里查到它的 chunk 写 modulepreload。
export const pageRoutes = [
  { path: '/', Page: null, module: null },
  { path: '/products', Page: ProductsPage, module: 'src/pages/ProductsPage.jsx' },
  { path: '/enterprise', Page: EnterprisePage, module: 'src/pages/EnterprisePage.jsx' },
  { path: '/enterprise/:id', Page: EnterpriseProductPage, module: 'src/pages/EnterpriseProductPage.jsx' },
  { path: '/products/:id', Page: ProductDetailPage, module: 'src/pages/ProductDetailPage.jsx' },
  { path: '/brand', Page: BrandPage, module: 'src/pages/BrandPage.jsx' },
  { path: '/contact', Page: ContactPage, module: 'src/pages/ContactPage.jsx' },
  { path: '/consult', Page: ConsultPage, module: 'src/pages/ConsultPage.jsx' },
  { path: '/privacy', Page: PrivacyPage, module: 'src/pages/PrivacyPage.jsx' },
];

export const notFoundModule = 'src/pages/NotFoundPage.jsx';

export const findPageRoute = (pathname) =>
  pageRoutes.find(({ path }) => matchPath(path, pathname)) || null;

// 渲染前先把当前地址要用的页面 chunk 拉下来，首屏渲染因此不会挂起。
export function preloadRoute(pathname) {
  const route = findPageRoute(pathname);
  const Page = route ? route.Page : NotFoundPage;
  return Page ? Page.preload() : Promise.resolve();
}
