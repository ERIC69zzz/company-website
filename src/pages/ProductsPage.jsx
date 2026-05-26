import { Link, useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import PageHeader from '../components/PageHeader';
import ProductImage from '../components/ProductImage';
import ScrollReveal from '../components/ScrollReveal';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="group glass-card rounded-xl overflow-hidden h-full flex flex-col">
        <ProductImage
          product={product}
          className="aspect-square bg-dark-800 relative overflow-hidden"
          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          showBrandBadge
        />

        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-sm font-bold text-white truncate mb-1 group-hover:text-brand-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-2 mb-2 flex-1">
            {product.shortDesc}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-brand-400 font-bold text-sm">{product.price}</span>
            <span className="text-xs text-zinc-600 group-hover:text-brand-500 transition-colors">
              查看详情 →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const activeCategory =
    categoryParam && categories.some((c) => c.id === categoryParam)
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
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title="产品中心" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            该分类下暂无产品
          </div>
        )}
      </div>
    </div>
  );
}
