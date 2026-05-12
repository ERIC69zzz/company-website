import { HardDrive, Server, Database, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const products = [
  {
    icon: HardDrive,
    title: '机械硬盘',
    category: 'hdd',
    desc: '希捷酷狼、西数红盘等企业级NAS专用硬盘，7×24小时稳定运行。',
  },
  {
    icon: Database,
    title: '固态硬盘',
    category: 'ssd',
    desc: '高速NVMe与SATA SSD，满足NAS缓存加速与高性能存储需求。',
  },
  {
    icon: Server,
    title: 'NAS私有云',
    category: 'nas',
    desc: '绿联、极空间全系产品，从双盘位到八盘位，搭载自研系统。',
  },
  {
    icon: Layers,
    title: '存储配件',
    category: 'accessory',
    desc: '硬盘盒、扩展卡、RAID卡等周边配件，一站式配齐存储方案。',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
              核心产品
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              全品类存储产品
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              代理绿联、极空间等一线品牌，覆盖从个人家庭到企业级的全场景数据存储需求
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.title} delay={i * 0.1}>
              <Link
                to={`/products?category=${product.category}`}
                className="block h-full group"
              >
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:bg-brand-900/20 hover:border-brand-700/50 hover:shadow-lg hover:shadow-brand-900/20">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                    <product.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {product.desc}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* 探索全部产品卡片 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10">
            <Link
              to="/products"
              className="group block glass-card rounded-2xl p-8 border border-white/5 hover:border-brand-700/50 transition-all hover:bg-brand-900/10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-brand-600/15 flex items-center justify-center group-hover:bg-brand-600/25 transition-colors">
                    <ExternalLink className="w-7 h-7 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                      探索全部产品
                    </h3>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      浏览完整产品目录、详细参数与实时报价
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 group-hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-900/30">
                  前往产品中心
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
