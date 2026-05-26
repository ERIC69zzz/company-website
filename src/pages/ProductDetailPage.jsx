import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone } from 'lucide-react';
import { products } from '../data/products';
import { company } from '../data/site';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductImage';
import ScrollReveal from '../components/ScrollReveal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-900 pt-32 text-center">
        <p className="text-zinc-400">产品不存在</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-brand-400 hover:text-brand-300"
        >
          返回产品列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader
        backTo="/products"
        backLabel="返回产品列表"
        maxWidth="max-w-5xl"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal>
            <ProductImage
              product={product}
              className="aspect-square rounded-2xl bg-dark-800 border border-white/5 overflow-hidden flex items-center justify-center"
              fallbackIconClassName="w-16 h-16 mb-4"
            />
          </ScrollReveal>

          <div className="flex flex-col">
            <ScrollReveal>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-3">
                  {product.brand}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-brand-400 mb-6">
                  {product.price}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={company.telHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    电话咨询
                  </a>
                  <button
                    onClick={() => navigate('/consult')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    在线咨询
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-white mb-4">规格参数</h3>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i, arr) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i !== arr.length - 1 ? 'border-b border-white/5' : ''
                      }`}
                    >
                      <span className="text-sm text-zinc-500">{key}</span>
                      <span className="text-sm text-white font-medium text-right">
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
