import { useState, useEffect, useId, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check, ChevronDown, Languages, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { languageOptions, useLanguage } from '../i18n/language';

function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, copy } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const currentLanguage = languageOptions.find((option) => option.value === language);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selectLanguage = (value) => {
    setLanguage(value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={copy.language.label}
        className={`group flex h-10 items-center rounded-xl border border-white/10 bg-dark-800/70 text-zinc-200 shadow-sm backdrop-blur-xl transition-all hover:border-brand-500/35 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 ${compact ? 'gap-1.5 px-2' : 'gap-2 px-2.5'}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-500/15 bg-gradient-to-br from-brand-500/15 to-accent-500/10 text-brand-300 transition-colors group-hover:border-brand-500/30">
          <Languages className="h-3.5 w-3.5" />
        </span>
        <span className={`text-xs font-semibold tracking-wide ${compact ? 'min-w-5 text-center' : 'min-w-12 text-left'}`}>
          {compact ? currentLanguage.shortLabel : currentLanguage.label}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 group-hover:text-zinc-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={copy.language.label}
          className="absolute right-0 top-full z-[70] mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-dark-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          style={{ animation: 'chatFadeIn 0.18s ease-out' }}
        >
          <div className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
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
                    ? 'border-brand-500/20 bg-brand-500/10 text-white'
                    : 'border-transparent text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                  active
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'bg-white/5 text-zinc-500'
                }`}>
                  {option.shortLabel}
                </span>
                <span className="flex-1 text-sm font-medium">{option.label}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                  active ? 'bg-accent-500/15 text-accent-400' : 'text-transparent'
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { copy } = useLanguage();
  const isHome = location.pathname === '/';
  const navItems = [
    { label: copy.nav.home, href: '#home', type: 'anchor' },
    { label: copy.nav.products, href: '/products', type: 'route' },
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
    setMobileOpen(false);

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
    setMobileOpen(false);

    const isCanonicalHome = isHome && !location.search && !location.hash;
    if (isCanonicalHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            onClick={handleLogoClick}
            aria-label={copy.nav.home}
            className="flex items-center gap-2 group"
          >
            <Logo className="w-9 h-9 group-hover:scale-105 transition-transform" alt={copy.nav.brand} />
            <span className="text-lg font-bold text-white tracking-tight">
              {copy.nav.brand}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-brand-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/consult"
              onClick={(e) => handleNavClick(e, { href: '/consult', type: 'route' })}
              className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors shadow-lg shadow-brand-900/30"
            >
              {copy.nav.consult}
            </a>
            <LanguageSwitcher />
          </div>

          <div className="lg:hidden flex items-center gap-1.5">
            <LanguageSwitcher compact />
            <button
              type="button"
              className="p-2 text-zinc-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
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
        <div id="mobile-navigation" className="lg:hidden glass border-t border-white/5">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="block px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-brand-400 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/consult"
              onClick={(e) => handleNavClick(e, { href: '/consult', type: 'route' })}
              className="block px-3 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-lg mt-2 cursor-pointer"
            >
              {copy.nav.consult}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
