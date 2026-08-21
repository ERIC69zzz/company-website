import { Award, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const stats = [
  { icon: Calendar, value: '15+', label: '年行业经验' },
  { icon: Users, value: '1000+', label: '服务客户' },
  { icon: Award, value: '正品', label: '授权保障' },
  { icon: MapPin, value: '北京', label: '本地服务' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-x-clip py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <Award className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">绿联授权 · 极空间代理</div>
                    <div className="text-xs text-zinc-500">NAS私有云 · 硬盘 · 存储配件</div>
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">成立时间</span>
                    <span className="text-white font-medium">2010年</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">所在地区</span>
                    <span className="text-white font-medium">北京市海淀区</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">主营业务</span>
                    <span className="text-white font-medium">硬盘 / NAS私有云</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">服务范围</span>
                    <span className="text-white font-medium">全国发货 · 北京上门</span>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-brand-600/15 rounded-full blur-[60px]" />
              <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-brand-500/10 rounded-full blur-[50px]" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
                品牌理念
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                友聚四海 <span className="text-brand-400">·</span> 质服五洲
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                北京友质科技有限公司成立于2010年，十五年来始终专注于数据存储领域。作为绿联、极空间等一线品牌的核心授权经销商，我们确保每一件产品均为正品行货，享受官方完整质保。
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                凭借专业的技术团队与丰富的项目经验，我们已成功为超过1000位客户部署了稳定可靠的存储解决方案。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center"
                  >
                    <stat.icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link
                to="/brand"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
              >
                了解品牌故事
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
