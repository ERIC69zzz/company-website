import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';

export default function PageHeader({
  title,
  backTo = '/',
  backLabel,
  maxWidth = 'max-w-7xl',
  // 'dark' 用于深色版面之上（企业页的深蓝 hero）
  tone = 'light',
  // 页面自带栅格时传入，让返回链接与正文左边缘对齐
  container,
}) {
  const { copy } = useLanguage();
  const dark = tone === 'dark';
  // 边框由 .chrome / .chrome-dark 各自负责，不在这里再叠一层 Tailwind 边框，
  // 否则深色版的分隔线会被浅色那条覆盖。
  const containerClass = container || `${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`;

  // 吸附位置要让开固定导航栏的高度（h-16 / lg:h-20），
  // 否则滚动时会滑到导航栏下面被盖住。
  return (
    <div className={`${dark ? 'chrome-dark' : 'chrome'} sticky top-16 lg:top-20 z-40`}>
      <div className={`${containerClass} h-14 flex items-center justify-between`}>
        <Link
          to={backTo}
          className={`flex items-center gap-2 text-sm transition-colors ${
            dark ? 'text-white/70 hover:text-white' : 'text-ink-2 hover:text-ink'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel || copy.common.backHome}
        </Link>
        {title && (
          <h1 className={`text-base font-bold ${dark ? 'text-white' : 'text-ink'}`}>{title}</h1>
        )}
        <div className="w-16" />
      </div>
    </div>
  );
}
