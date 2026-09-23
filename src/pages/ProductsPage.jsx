import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductImage';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../i18n/language';
import { localizeProducts } from '../i18n/products';
import { useClientReady } from '../utils/hydration';

function ProductCard({ product }) {
  const { copy } = useLanguage();

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group panel panel-raised rounded-xl overflow-hidden h-full flex flex-col">
        <ProductImage
          product={product}
          className="aspect-square bg-surface-2 relative overflow-hidden"
          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          showBrandBadge
        />

        <div className="p-3 flex flex-col flex-1">
          <h2 className="text-sm font-bold text-ink truncate mb-1 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h2>
          <p className="text-xs text-ink-3 line-clamp-2 mb-2 flex-1">
            {product.shortDesc}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-brand-600 font-bold text-sm">{product.price}</span>
            <span className="text-xs text-ink-3 group-hover:text-brand-500 transition-colors">
              {copy.common.viewDetails}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const { language, copy } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  // 预渲染的是「全部产品」；带 ?category= 落地时，hydrate 之后、绘制之前再切到对应分类
  const clientReady = useClientReady();
  const localizedCategories = categories.map((category, index) => ({
    ...category,
    name: copy.data.categories[index],
  }));
  const localizedProducts = localizeProducts(products, language);
  const categoryParam = clientReady ? searchParams.get('category') : null;
  const activeCategory =
    categoryParam && localizedCategories.some((c) => c.id === categoryParam)
      ? categoryParam
      : 'all';

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts =
    activeCategory === 'all'
      ? localizedProducts
      : localizedProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface pt-16 lg:pt-20 pb-16">
      <PageHeader title={copy.productsPage.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {localizedCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={activeCategory === cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`min-h-11 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'bg-surface-2 text-ink-2 hover:bg-surface-3 hover:text-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 错峰延迟封顶：21 张卡片按 i * 0.05 递增会让最后一张等满一秒 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={Math.min(i, 6) * 0.05}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* 首页的机械硬盘、固态硬盘大卡片都链到这里，分类还空着时
            不能停在一句「暂无产品」上，要给出下一步 */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center text-center py-20">
            <p className="text-ink-2">{copy.productsPage.empty}</p>
            <p className="mt-2 max-w-md text-sm text-ink-3">{copy.productsPage.emptyHint}</p>
            <Link to="/consult" className="storage-button mt-6">
              {copy.productsPage.emptyCta}<ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
