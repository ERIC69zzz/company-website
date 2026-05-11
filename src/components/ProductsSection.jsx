import { HardDrive, Server, Database, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const products = [
  {
    icon: HardDrive,
    title: '机械硬盘',
    category: 'hdd',
    desc: '希捷酷狼、西数红盘等企业级NAS专用硬盘，2.5/3.5英寸全规格覆盖，稳定耐用，7×24小时不间断运行。',
    tags: ['酷狼系列', '红盘系列', '企业级'],
  },
  {
    icon: Database,
    title: '固态硬盘',
    category: 'ssd',
    desc: '高速NVMe SSD与SATA SSD，满足NAS缓存加速、个人工作站及企业服务器的高性能存储需求。',
    tags: ['NVMe', 'SATA', '高速缓存'],
  },
  {
    icon: Server,
    title: 'NAS私有云设备',
    category: 'nas',
    desc: '绿联、极空间NAS全系产品，从双盘位到八盘位，搭载自研系统，支持万兆网口、AI智能相册与影视墙功能。',
    tags: ['绿联授权', '极空间代理', '万兆网口'],
  },
  {
    icon: Layers,
    title: '存储配件',
    category: 'accessory',
    desc: '硬盘盒、M.2固态硬盘盒、SATA扩展卡、RAID阵列卡等存储周边配件，一站式配齐您的存储方案。',
    tags: ['硬盘盒', '扩展卡', 'RAID卡'],
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
              产品中心
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              全品类存储产品
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              从单盘硬盘到多盘位NAS私有云，满足个人家庭到企业级的全场景数据存储需求
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.title} delay={i * 0.1}>
              <Link to={`/products?category=${product.category}`} className="block h-full group">
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:bg-brand-900/20 hover:border-brand-700/50 hover:shadow-lg hover:shadow-brand-900/20">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                    <product.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                    {product.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium text-brand-300 bg-brand-900/40 border border-brand-800/40 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
            >
              查看全部产品
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
