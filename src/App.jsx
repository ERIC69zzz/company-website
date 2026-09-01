import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScenarioSection from './components/ScenarioSection';
import StorefrontSection from './components/StorefrontSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import EnterprisePage from './pages/EnterprisePage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandPage from './pages/BrandPage';
import ContactPage from './pages/ContactPage';
import ConsultPage from './pages/ConsultPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './i18n/LanguageContext';
import { hasPlayedBrandIntro, markBrandIntroPlayed } from './utils/brandIntroSession';

function HomePage() {
  const { hash } = useLocation();
  const brandTargetRef = useRef(null);
  const [introPhase, setIntroPhase] = useState(() => (
    (hash && hash !== '#home')
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || hasPlayedBrandIntro()
      ? 'ready'
      : 'intro'
  ));
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
  // A new inquiry target starts a new form; language changes keep the user's draft.
  return <ConsultPage key={search} />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

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
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <BrandIntroVisitTracker />
        <ScrollToTop />
        <div className="min-h-screen bg-surface text-ink">
          <PageNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consult" element={<ConsultRoute />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
