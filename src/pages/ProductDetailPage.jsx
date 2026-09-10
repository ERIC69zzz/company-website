import { ArrowRight, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { company } from '../data/site';
import PageHeader from '../components/PageHeader';
import ProductGallery from '../components/ProductGallery';
import ProductImage from '../components/ProductImage';
import NotFoundPage from './NotFoundPage';
import { useLanguage } from '../i18n/language';
import { localizeProducts } from '../i18n/products';

// 版式与企业整机详情页（EnterpriseProductPage）一致：
// 上半屏大图与要点，往下依次是关键特性、规格参数、产品说明、咨询。
// 关键特性是可选的 —— 产品只填了规格时整段跳过，便于先录规格后补亮点。
export default function ProductDetailPage() {
  const { id } = useParams();
  const { language, copy } = useLanguage();
  const originalProduct = products.find((p) => p.id === id);
  const product = originalProduct
    ? localizeProducts([originalProduct], language)[0]
    : null;

  if (!product) {
    return <NotFoundPage />;
  }

  const highlights = product.highlights || [];

  return (
    <div className="min-h-screen bg-surface pt-16 lg:pt-20 pb-16">
      <PageHeader
        backTo="/products"
        backLabel={copy.common.backProducts}
        maxWidth="max-w-5xl"
      />

      <section className="product-detail__top" aria-labelledby="product-title">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 product-detail__layout">
          {/* 有两张以上大图就换成可左右滑动的图廊；
              只有封面一张时沿用 ProductImage，它带缺图占位不会破图。 */}
          {product.images?.length > 1 ? (
            <ProductGallery
              images={product.images}
              alt={`${product.brand} ${product.name}`}
            />
          ) : (
            <ProductImage
              product={product}
              className="aspect-square rounded-2xl bg-surface-2 border border-line overflow-hidden flex items-center justify-center"
              fallbackIconClassName="w-16 h-16 mb-4"
              loading="eager"
            />
          )}

          <div className="product-detail__intro">
            <p className="enterprise-eyebrow">{product.brand}</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-detail__tagline">{product.shortDesc}</p>
            <p className="product-detail__price">{product.price}</p>

            <div className="product-detail__tags">
              {product.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="product-detail__actions">
              <a href={company.telHref} className="storage-button">
                <Phone aria-hidden="true" />
                {copy.productDetail.phone}
              </a>
              <Link to="/consult" className="storage-text-link">
                {copy.productDetail.online}<ArrowRight aria-hidden="true" />
              </Link>
            </div>

            {product.images?.length === 1 && (
              <p className="product-detail__note">{copy.common.gallery.single}</p>
            )}
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <section
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 product-detail__section"
          aria-labelledby="product-highlights"
        >
          <h2 id="product-highlights">{copy.productDetail.highlights}</h2>
          <div className="product-detail__highlights">
            {highlights.map((item) => (
              <article key={item.title} className="product-detail__highlight">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 product-detail__section"
        aria-labelledby="product-specs"
      >
        <h2 id="product-specs">{copy.productDetail.specs}</h2>
        <dl className="product-detail__specs">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 product-detail__section"
        aria-labelledby="product-description"
      >
        <h2 id="product-description">{copy.productDetail.about}</h2>
        <p className="product-detail__description">{product.description}</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="enterprise-cta" aria-labelledby="product-cta">
          <div>
            <h2 id="product-cta">{copy.productDetail.ctaTitle}</h2>
            <p>{copy.productDetail.ctaDesc}</p>
          </div>
          <Link to="/consult" className="storage-button">
            {copy.productDetail.online}<ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
