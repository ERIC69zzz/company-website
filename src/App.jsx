import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollStory from './components/ScrollStory';
import ProductsSection from './components/ProductsSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandPage from './pages/BrandPage';
import ContactPage from './pages/ContactPage';
import ConsultPage from './pages/ConsultPage';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './i18n/LanguageContext';

function HomePage() {
  const nasHandoffTargetRef = useRef(null);

  return (
    <>
      <div className="relative overflow-x-clip bg-dark-900">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <HeroSection handoffTargetRef={nasHandoffTargetRef} />
        <ScrollStory deviceTargetRef={nasHandoffTargetRef} />
      </div>
      <ProductsSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-900 text-zinc-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <ChatWidget />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
