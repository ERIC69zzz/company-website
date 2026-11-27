import { Suspense, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import DocumentMeta from './components/DocumentMeta';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScenarioSection from './components/ScenarioSection';
import StorefrontSection from './components/StorefrontSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { LanguageProvider } from './i18n/LanguageContext';
import { HydrationComplete, useClientReady } from './utils/hydration';
import { RouteCommitSignal } from './utils/pageTransition';
import {
  BrandPage,
  ConsultPage,
  ContactPage,
  EnterprisePage,
  EnterpriseProductPage,
  NotFoundPage,
  PrivacyPage,
  ProductDetailPage,
  ProductsPage,
} from './routes';

function HomePage() {
  return (
    <div id="home">
      <Navbar sticky />
      <main>
        <HeroSection />
        <StorefrontSection />
        <ScenarioSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

function PageNavigation() {
  const { pathname } = useLocation();
  return pathname === '/' ? null : <Navbar />;
}

function ConsultRoute() {
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  // 预渲染的咨询页不带查询串，hydrate 那一轮先按空表单渲染，之后再换成带主题的表单
  const clientReady = useClientReady();
  // A new inquiry target starts a new form; language changes keep the user's draft.
  return (
    <ConsultPage
      key={clientReady ? search : ''}
      searchParams={clientReady ? searchParams : EMPTY_SEARCH_PARAMS}
    />
  );
}

const EMPTY_SEARCH_PARAMS = new URLSearchParams();

function ScrollToTop() {
  // search 也要算进来：在 /products 页底点页脚的「固态硬盘」只改查询串，
  // 不回顶部的话筛选结果在屏幕外，看上去像点了没反应（/consult 的服务入口同理）。
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useLayoutEffect(() => {
    if (hash && hash !== '#home') {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        return () => clearTimeout(timer);
      }
    }
    // 路由定位在绘制前完成，避免全局 smooth 让刷新恢复位置变成自动滚动。
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash]);
  return null;
}

// 路由器由调用方提供：浏览器里是 BrowserRouter（main.jsx），预渲染时是 StaticRouter（entry-server.jsx）
export default function App() {
  return (
    <LanguageProvider>
      <DocumentMeta />
      <ScrollToTop />
      {/* 顶部导航的换页动画要等新页面提交后才截新画面，由它发信号 */}
      <RouteCommitSignal />
      <div className="min-h-screen bg-surface text-ink">
        <PageNavigation />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/enterprise/:id" element={<EnterpriseProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consult" element={<ConsultRoute />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* 必须在边界之内、页面之后：页面 hydrate 完才算首屏结束 */}
          <HydrationComplete />
        </Suspense>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
