import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';

export default function PageHeader({
  title,
  backTo = '/',
  backLabel,
  maxWidth = 'max-w-7xl',
}) {
  const { copy } = useLanguage();

  return (
    <div className="glass sticky top-0 z-40 border-b border-white/5">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between`}>
        <Link
          to={backTo}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel || copy.common.backHome}
        </Link>
        {title && <h1 className="text-base font-bold text-white">{title}</h1>}
        <div className="w-16" />
      </div>
    </div>
  );
}
