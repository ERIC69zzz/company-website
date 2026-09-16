import { ArrowRight, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { company } from '../data/site';
import { enterpriseProductInquiryUrl, findEnterpriseProduct } from '../data/enterprise';
import PageHeader from '../components/PageHeader';
import ProductGallery from '../components/ProductGallery';
import NotFoundPage from './NotFoundPage';
import { useLanguage } from '../i18n/language';

export default function EnterpriseProductPage() {
  const { id } = useParams();
  const { copy } = useLanguage();
  const product = findEnterpriseProduct(id);
  const e = copy.business.enterprise;
  const text = product ? e.products[product.id] : null;

  if (!product || !text) return <NotFoundPage />;

  return (
    <main className="enterprise-page">
      <PageHeader
        tone="dark"
        container="enterprise-container"
        backTo="/enterprise"
        backLabel={e.productsTitle}
      />

      {/* 上半屏：大图 + 型号与要点。往下滚是完整详情，与商品页的习惯一致 */}
      <section className="product-detail__top" aria-labelledby="product-title">
        <div className="enterprise-container product-detail__layout">
          <ProductGallery images={product.images} alt={`${text.brand} ${product.name}`} />

          <div className="product-detail__intro">
            <p className="enterprise-eyebrow">{text.brand} · {product.series}</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-detail__tagline">{text.tagline}</p>
            <p className="product-detail__summary">{text.summary}</p>

            <div className="product-detail__actions">
              <Link to={enterpriseProductInquiryUrl(product.id)} className="storage-button">
                {e.inquiry}<ArrowRight aria-hidden="true" />
              </Link>
              <a href={company.telHref} className="storage-text-link">
                <Phone aria-hidden="true" />{company.phone}
              </a>
            </div>

            {product.images.length === 1 && (
              <p className="product-detail__note">{copy.common.gallery.single}</p>
            )}
          </div>
        </div>
      </section>

      <section className="enterprise-container product-detail__section" aria-labelledby="product-highlights">
        <h2 id="product-highlights">{e.productHighlightTitle}</h2>
        <div className="product-detail__highlights">
          {product.highlightKeys.map((key) => (
            <article key={key} className="product-detail__highlight">
              <h3>{text.highlights[key].title}</h3>
              <p>{text.highlights[key].desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="enterprise-container product-detail__section" aria-labelledby="product-specs">
        <h2 id="product-specs">{e.productSpecTitle}</h2>
        <dl className="product-detail__specs">
          {product.specKeys.map((key) => (
            <div key={key}>
              <dt>{text.specs[key].label}</dt>
              <dd>{text.specs[key].value}</dd>
            </div>
          ))}
        </dl>
        <p className="enterprise-series__note">{e.specNote}</p>
      </section>

      <section className="enterprise-container product-detail__section" aria-labelledby="product-description">
        <h2 id="product-description">{e.productAboutTitle}</h2>
        <p className="product-detail__description">{text.description}</p>
      </section>

      <div className="enterprise-container">
        <section className="enterprise-cta" aria-labelledby="product-cta">
          <div>
            <h2 id="product-cta">{e.ctaTitle}</h2>
            <p>{e.ctaDescription}</p>
          </div>
          <Link to={enterpriseProductInquiryUrl(product.id)} className="storage-button">
            {e.inquiry}<ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  );
}
