import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Package, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { accentByIndex } from '../lib/accent';
import { useLanguage } from '../i18n/language';

const shortcutRoutes = [
  { to: '/', icon: Home },
  { to: '/products', icon: Package },
  { to: '/contact', icon: Phone },
];

export default function NotFoundPage() {
  const { copy } = useLanguage();
  const shortcuts = shortcutRoutes.map((item, index) => ({
    ...item,
    ...copy.notFound.shortcuts[index],
  }));

  // 预渲染的 404.html 自带这条 noindex（nginx 同时返回 404 状态码）；
  // 客户端路由进到这里时补上，离开时移除，免得带进下一个页面。
  useEffect(() => {
    let meta = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, follow';
    return () => {
      meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface pt-16 lg:pt-20 pb-16">
      <PageHeader title={copy.notFound.title} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="text-center py-12 lg:py-16">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-8 h-8 text-brand-600" />
            </div>
            <div className="text-6xl font-bold text-brand-500/30 mb-4">404</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
              {copy.notFound.heading}
            </h2>
            <p className="text-ink-2 max-w-md mx-auto">
              {copy.notFound.desc}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {shortcuts.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${accentByIndex(i).card} rounded-2xl p-6 border border-line text-center ${accentByIndex(i).hover} transition-all hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${accentByIndex(i).iconBox} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${accentByIndex(i).icon}`} />
                </div>
                <div className="text-base font-bold text-ink mb-1">{item.label}</div>
                <div className="text-xs text-ink-3">{item.desc}</div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
