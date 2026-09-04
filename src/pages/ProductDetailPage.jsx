import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { products } from '../data/products';
import { company } from '../data/site';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductImage';
import ScrollReveal from '../components/ScrollReveal';
import NotFoundPage from './NotFoundPage';
import { useLanguage } from '../i18n/language';
import { localizeProducts } from '../i18n/products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, copy } = useLanguage();
  const originalProduct = products.find((p) => p.id === id);
  const product = originalProduct
    ? localizeProducts([originalProduct], language)[0]
    : null;

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-surface pt-16 lg:pt-20 pb-16">
      <PageHeader
        backTo="/products"
        backLabel={copy.common.backProducts}
        maxWidth="max-w-5xl"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal>
            <ProductImage
              product={product}
              className="aspect-square rounded-2xl bg-surface-2 border border-line overflow-hidden flex items-center justify-center"
              fallbackIconClassName="w-16 h-16 mb-4"
            />
          </ScrollReveal>

          <div className="flex flex-col">
            <ScrollReveal>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-xs font-medium mb-3">
                  {product.brand}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-3">
                  {product.name}
                </h1>
                <p className="text-ink-2 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-brand-600 mb-6">
                  {product.price}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface-2 border border-line text-xs text-ink-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={company.telHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-900 hover:bg-brand-800 text-white font-semibold rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    {copy.productDetail.phone}
                  </a>
                  <button
                    onClick={() => navigate('/consult')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-surface-2 hover:bg-surface-3 text-ink font-semibold rounded-xl border border-line transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {copy.productDetail.online}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-ink mb-4">{copy.productDetail.specs}</h3>
                <div className="rounded-xl border border-line bg-surface-2 overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i, arr) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i !== arr.length - 1 ? 'border-b border-line' : ''
                      }`}
                    >
                      <span className="text-sm text-ink-3">{key}</span>
                      <span className="text-sm text-ink font-medium text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
