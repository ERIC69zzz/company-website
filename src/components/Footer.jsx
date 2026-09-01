import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../i18n/language';

const linkTargets = [
  ['/products?category=hdd', '/products?category=ssd', '/products?category=nas', '/products?category=accessory'],
  ['/consult', '/consult', '/consult', '/consult'],
  ['/brand', '/contact', '/contact', '/privacy'],
];

export default function Footer() {
  const { copy } = useLanguage();
  const links = copy.footer.groups.map((group, groupIndex) => ({
    title: group.title,
    items: group.items.map((label, itemIndex) => ({
      label,
      href: linkTargets[groupIndex][itemIndex],
    })),
  }));
  links[0].items.push({ label: copy.business.enterpriseNav, href: '/enterprise' });

  return (
    <footer className="relative hairline bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="w-8 h-8" alt={copy.footer.fullName} />
              <span className="text-base font-bold text-ink">{copy.footer.fullName}</span>
            </div>
            <p className="text-sm text-ink-3 leading-relaxed max-w-sm mb-6">
              {copy.footer.description}
            </p>
            <div className="text-xs text-ink-3">
              <div>{copy.footer.address}</div>
              <div className="mt-1">{copy.footer.phone}</div>
            </div>
          </div>

          {links.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-ink mb-4">{group.title}</div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="text-sm text-ink-3 hover:text-brand-600 transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-ink-3 cursor-default">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 hairline flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ink-3">
            © {new Date().getFullYear()} {copy.footer.copyright}
          </div>
          <div className="text-xs text-ink-3">
            {copy.footer.slogan}
          </div>
        </div>
      </div>
    </footer>
  );
}
