import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { hasPlayedBrandIntro, markBrandIntroPlayed } from './utils/brandIntroSession';
import { HydrationComplete, mustMatchServer, useClientReady } from './utils/hydration';
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

// 带锚点进来、偏好减少动效、本次会话已经播过，都跳过开场
const shouldSkipIntro = (hash) =>
  (hash && hash !== '#home')
  || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  || hasPlayedBrandIntro();

function HomePage() {
  const { hash } = useLocation();
  const brandTargetRef = useRef(null);
  // 预渲染的首页停在「开场中」：没播过的访客 JS 还没到时开场就已经开始，
  // hydrate 也得先按这个状态渲染，回访等情况在下面绘制前再纠正。
  const [fromPrerender] = useState(mustMatchServer);
  const [introPhase, setIntroPhase] = useState(() => (
    fromPrerender || !shouldSkipIntro(hash) ? 'intro' : 'ready'
  ));

  // 判断只做一次并记住：下面的 effect 挂载时就会标记「已播放」，
  // StrictMode 在开发环境重跑 layout effect 时再判断，首访也会被误判成回访。
  const skipAfterHydration = useRef(null);
  useLayoutEffect(() => {
    if (!fromPrerender) return;
    skipAfterHydration.current ??= shouldSkipIntro(window.location.hash);
    if (skipAfterHydration.current) setIntroPhase('ready');
  }, [fromPrerender]);
  const beginDocking = useCallback(() => setIntroPhase('docking'), []);
  const finishIntro = useCallback(() => setIntroPhase('ready'), []);
  const introActive = introPhase !== 'ready';

  useEffect(() => {
    // Mark on entry rather than completion: leaving midway and returning should not replay it.
    markBrandIntroPlayed();
  }, []);

  return (
    <div id="home" className="home-entry" data-intro-phase={introPhase}>
      {introActive && (
        <HeroSection
          brandTargetRef={brandTargetRef}
          onDock={beginDocking}
          onComplete={finishIntro}
        />
      )}
      <Navbar sticky brandTargetRef={brandTargetRef} introActive={introActive} />
      <main className="home-entry__content" inert={introActive}>
        <StorefrontSection />
        <ScenarioSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}

function BrandIntroVisitTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If the first landing page is not the homepage, returning home is already a revisit.
    if (pathname !== '/') markBrandIntroPlayed();
  }, [pathname]);

  return null;
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
      <BrandIntroVisitTracker />
      <ScrollToTop />
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
