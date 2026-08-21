import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Package, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { accentByIndex } from '../lib/accent';

const shortcuts = [
  { to: '/', icon: Home, label: '返回首页', desc: '回到网站首页' },
  { to: '/products', icon: Package, label: '产品中心', desc: '浏览全部存储产品' },
  { to: '/contact', icon: Phone, label: '联系我们', desc: '电话与地址信息' },
];

export default function NotFoundPage() {
  // 单页应用无法在客户端改 HTTP 状态码，
  // 用 noindex 阻止搜索引擎把不存在的地址收进索引（soft 404）。
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title="页面不存在" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="text-center py-12 lg:py-16">
            <div className="w-16 h-16 rounded-2xl bg-brand-600/15 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-8 h-8 text-brand-400" />
            </div>
            <div className="text-6xl font-bold text-brand-500/30 mb-4">404</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              没有找到这个页面
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              页面可能已经下架或地址有误。您可以从下面的入口继续浏览，
              或拨打服务热线由我们协助您。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {shortcuts.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className={`glass-card ${accentByIndex(i).card} rounded-2xl p-6 border border-white/5 text-center ${accentByIndex(i).hover} transition-all hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${accentByIndex(i).iconBox} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${accentByIndex(i).icon}`} />
                </div>
                <div className="text-base font-bold text-white mb-1">{item.label}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
