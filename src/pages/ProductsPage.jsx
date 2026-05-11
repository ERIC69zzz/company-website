import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { products, categories } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/products/${product.id}`}>
      <div className="group glass-card rounded-xl overflow-hidden h-full flex flex-col">
        {/* 图片区域 */}
        <div className="aspect-square bg-dark-800 relative overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-dark-800 text-zinc-600">
              <ImageOff className="w-10 h-10 mb-2" />
              <span className="text-xs">{product.brand}</span>
              <span className="text-sm font-medium mt-1">{product.name}</span>
            </div>
          )}
          {/* 品牌标签 */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-dark-900/80 backdrop-blur text-xs text-zinc-300 border border-white/5">
            {product.brand}
          </div>
        </div>

        {/* 信息区域 */}
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
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      {/* 顶部导航栏 */}
      <div className="glass sticky top-0 z-40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="text-base font-bold text-white">产品中心</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 分类筛选 */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

        {/* 产品网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* 空状态 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            该分类下暂无产品
          </div>
        )}
      </div>
    </div>
  );
}
