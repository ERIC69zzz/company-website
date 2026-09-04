import { useCallback, useState, useEffect, useId, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Languages, Menu, X } from 'lucide-react';
import Logo from './Logo';
import BrandWordmark from './BrandWordmark';
import { languageOptions, useLanguage } from '../i18n/language';

// open / onOpenChange 由 Navbar 托管：语言菜单和移动端导航必须互斥，
// 否则语言浮层会盖住展开的导航项，且点击被浮层吃掉，导航项按不动。
function LanguageSwitcher({ compact = false, open, onOpenChange }) {
  const { language, setLanguage, copy } = useLanguage();
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const currentLanguage = languageOptions.find((option) => option.value === language);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) onOpenChange(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  const selectLanguage = (value) => {
    setLanguage(value);
    onOpenChange(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={copy.language.label}
        className={`group flex h-10 items-center rounded-xl border border-line bg-surface-2/70 text-ink-2 shadow-sm backdrop-blur-xl transition-all hover:border-brand-500/35 hover:bg-surface-3 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 ${compact ? 'gap-1.5 px-2' : 'gap-2 px-2.5'}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-500/15 bg-gradient-to-br from-brand-500/15 to-accent-500/10 text-brand-700 transition-colors group-hover:border-brand-500/30">
          <Languages className="h-3.5 w-3.5" />
        </span>
        <span className={`text-xs font-semibold tracking-wide ${compact ? 'min-w-5 text-center' : 'min-w-12 text-left'}`}>
          {compact ? currentLanguage.shortLabel : currentLanguage.label}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-ink-3 transition-transform duration-200 group-hover:text-ink-2 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={copy.language.label}
          className="absolute right-0 top-full z-[70] mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          style={{ animation: 'chatFadeIn 0.18s ease-out' }}
        >
          <div className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-3">
            {copy.language.label}
          </div>
          {languageOptions.map((option) => {
            const active = option.value === language;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => selectLanguage(option.value)}
                className={`flex w-full items-center gap-3 rounded-xl border px-2 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 ${
                  active
                    ? 'border-brand-500/20 bg-brand-500/10 text-ink'
                    : 'border-transparent text-ink-2 hover:bg-surface-2 hover:text-ink'
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                  active
                    ? 'bg-brand-500/20 text-brand-700'
                    : 'bg-surface-2 text-ink-3'
                }`}>
                  {option.shortLabel}
                </span>
                <span className="flex-1 text-sm font-medium">{option.label}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                  active ? 'bg-accent-500/15 text-accent-600' : 'text-transparent'
                }`}>
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ sticky = false, brandTargetRef, introActive = false }) {
  const [scrolled, setScrolled] = useState(false);
  // 顶栏同时只允许展开一个浮层。桌面端和移动端的语言开关各有自己的标识，
  // 这样被 display:none 隐藏的那一个不会跟着打开、抢走外部点击的判定。
  const [openPanel, setOpenPanel] = useState(null);
  const mobileOpen = openPanel === 'nav';
  const closePanels = useCallback(() => setOpenPanel(null), []);
  const toggleLanguage = useCallback((next) => setOpenPanel(next ? 'language' : null), []);
  const toggleCompactLanguage = useCallback((next) => setOpenPanel(next ? 'language-compact' : null), []);
  const location = useLocation();
  const navigate = useNavigate();
  const { copy } = useLanguage();
  const brandName = '友质科技';
  const isHome = location.pathname === '/';
  const navItems = [
    { label: copy.nav.home, href: '#home', type: 'anchor' },
    { label: copy.business.personalNav, href: '/products', type: 'route' },
    { label: copy.business.enterpriseNav, href: '/enterprise', type: 'route' },
    { label: copy.nav.solutions, href: '#services', type: 'anchor' },
    { label: copy.nav.brandWorld, href: '/brand', type: 'route' },
    { label: copy.nav.contact, href: '/contact', type: 'route' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    closePanels();

    if (item.type === 'route') {
      navigate(item.href);
      return;
    }

    if (isHome) {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${item.href}`);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    closePanels();

    const isCanonicalHome = isHome && !location.search && !location.hash;
    if (isCanonicalHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

  return (
    <nav
      inert={introActive}
      className={`${brandTargetRef ? 'home-entry__nav' : ''} ${sticky ? 'sticky' : 'fixed'} top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'chrome' : 'bg-surface/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label={copy.nav.home}
            className={`brand-lockup text-lg group${brandTargetRef ? ' home-entry__lockup' : ''}`}
          >
            <span className="brand-lockup__logo">
              <Logo className="block h-full w-full" />
            </span>
            <span
              ref={brandTargetRef}
              aria-label={brandName}
              lang="zh-CN"
            >
              <BrandWordmark name={brandName} />
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={item.type === 'route' && location.pathname === item.href ? 'page' : undefined}
                className="px-3 py-2 text-sm font-medium text-ink-2 hover:text-brand-600 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/consult"
              onClick={(e) => handleNavClick(e, { href: '/consult', type: 'route' })}
              className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-brand-900 hover:bg-brand-800 rounded-lg transition-colors"
            >
              {copy.nav.consult}
            </a>
            <LanguageSwitcher open={openPanel === 'language'} onOpenChange={toggleLanguage} />
          </div>

          <div className="xl:hidden flex items-center gap-1.5">
            <LanguageSwitcher
              compact
              open={openPanel === 'language-compact'}
              onOpenChange={toggleCompactLanguage}
            />
            <button
              type="button"
              className="p-2 text-ink-2 hover:text-ink"
              onClick={() => setOpenPanel(mobileOpen ? null : 'nav')}
              aria-label={mobileOpen ? copy.nav.close : copy.nav.open}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="xl:hidden chrome">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="block px-3 py-2.5 text-sm font-medium text-ink-2 hover:text-brand-600 rounded-lg hover:bg-surface-2 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/consult"
              onClick={(e) => handleNavClick(e, { href: '/consult', type: 'route' })}
              className="block px-3 py-2.5 text-sm font-semibold text-white bg-brand-900 rounded-lg mt-2 cursor-pointer"
            >
              {copy.nav.consult}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
