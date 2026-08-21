import { ArrowRight, Shield, Server, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

export default function HeroSection() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/12 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                始于2010 · 专注存储15年
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                企业级{' '}
                <span className="text-gradient">硬盘与NAS</span>
                <br />
                私有云存储专家
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                北京友质科技有限公司，为您提供从机械硬盘、固态硬盘到NAS私有云存储的一站式数据存储解决方案，让数据安全、高效、可控。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/40 hover:shadow-brand-900/60 hover:-translate-y-0.5"
                >
                  浏览产品
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleScroll('#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all hover:-translate-y-0.5"
                >
                  联系我们
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-brand-400" />
                  <span>数据安全</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-brand-400" />
                  <span>企业方案</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-brand-400" />
                  <span>极速响应</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} className="relative hidden lg:block">
            <div className="relative z-10 animate-float">
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center">
                    <Server className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">NAS 私有云</div>
                    <div className="text-xs text-zinc-500">绿联 / 极空间 · 在线</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">运行中</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-dark-800/60 p-3 border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1">总容量</div>
                    <div className="text-xl font-bold text-white">32 TB</div>
                    <div className="w-full h-1.5 bg-dark-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: '62%' }} />
                    </div>
                  </div>
                  <div className="rounded-xl bg-dark-800/60 p-3 border border-white/5">
                    <div className="text-xs text-zinc-500 mb-1">传输速度</div>
                    <div className="text-xl font-bold text-white">10 Gbps</div>
                    <div className="text-xs text-accent-400 mt-1">万兆网口</div>
                  </div>
                </div>

                <div className="rounded-xl bg-dark-800/60 p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500">硬盘状态</span>
                    <span className="text-xs text-accent-400">全部正常</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: '盘位 1', cap: '16TB', pct: 58 },
                      { name: '盘位 2', cap: '16TB', pct: 42 },
                    ].map((disk) => (
                      <div key={disk.name} className="flex items-center gap-3">
                        <span className="text-xs text-zinc-400 w-10">{disk.name}</span>
                        <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-600 to-accent-500 rounded-full"
                            style={{ width: `${disk.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-500 w-12 text-right">{disk.cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-brand-600/10 rounded-full blur-[60px]" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
