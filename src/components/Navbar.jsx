import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { languageOptions, useLanguage } from '../i18n/language';

function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, copy } = useLanguage();

  return (
    <label className="relative flex items-center text-zinc-400 hover:text-white transition-colors">
      <span className="sr-only">{copy.language.label}</span>
      <Languages className="absolute left-2.5 w-4 h-4 pointer-events-none" />
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={copy.language.label}
        className={`appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-2 text-xs font-medium text-zinc-200 outline-none hover:bg-white/10 focus:border-brand-500/60 ${compact ? 'w-[74px]' : 'w-[92px]'}`}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-dark-800">
            {compact ? option.shortLabel : option.label}
          </option>
        ))}
      </select>
    </label>
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
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
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
