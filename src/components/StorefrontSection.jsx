import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import StorageVisual from './StorageVisual';

const categories = [
  { id: 'hdd', label: 'HDD' },
  { id: 'ssd', label: 'SSD' },
  { id: 'nas', label: 'NAS' },
];

export default function StorefrontSection() {
  const { copy } = useLanguage();
  const s = copy.business.home;

  return (
    <section id="products" className="storefront" aria-labelledby="storefront-title">
      <div className="storefront__inner">
        <header className="storefront__heading">
          <h1 id="storefront-title">{s.title}</h1>
          <p className="storefront__description">{s.description}</p>
        </header>

        <div className="storefront__group-label">
          <h2>{s.personal}</h2>
        </div>
        <div className="storefront__products">
          {categories.map(({ id, label }) => (
            <Link key={id} to={`/products?category=${id}`} className="storefront__product">
              <StorageVisual kind={id} />
              <div className="storefront__product-copy">
                <span className="storefront__product-type" lang="en">{label}</span>
                <h3>{s.categories[id].title}<ArrowUpRight aria-hidden="true" /></h3>
                <p>{s.categories[id].detail}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="storefront__actions">
          <Link to="/products" className="storage-button">{s.allProducts}<ArrowRight aria-hidden="true" /></Link>
          <Link to="/consult" className="storage-text-link">{s.consult}<ArrowUpRight aria-hidden="true" /></Link>
        </div>

        <Link to="/enterprise" className="storefront__enterprise">
          <div className="storefront__enterprise-copy">
            <p className="storefront__business-label">{s.business}</p>
            <h2>{s.enterprise}</h2>
            <p className="storefront__enterprise-description">{s.enterpriseDesc}</p>
          </div>
          <StorageVisual kind="enterprise" className="storefront__enterprise-visual" />
          <span className="storefront__enterprise-link">{s.enterpriseLink}<ArrowRight aria-hidden="true" /></span>
        </Link>
      </div>
    </section>
  );
}
