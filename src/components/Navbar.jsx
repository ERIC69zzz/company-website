import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { label: '首页', href: '#home', type: 'anchor' },
  { label: '产品中心', href: '/products', type: 'route' },
  { label: '解决方案', href: '#services', type: 'anchor' },
  { label: '品牌天地', href: '/brand', type: 'route' },
  { label: '联系我们', href: '/contact', type: 'route' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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
            <Logo className="w-9 h-9 group-hover:scale-105 transition-transform" />
            <span className="text-lg font-bold text-white tracking-tight">
              友质科技
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
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
              立即咨询
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-zinc-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="md:hidden glass border-t border-white/5">
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
              立即咨询
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
