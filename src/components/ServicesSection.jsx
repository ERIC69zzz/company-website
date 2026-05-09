import { Settings, Wrench, HeadphonesIcon, Cloud } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    icon: Settings,
    title: '方案定制',
    desc: '根据您的数据规模、预算及使用场景，量身定制硬盘选型与NAS架构方案，让每一分投入都物有所值。',
  },
  {
    icon: Wrench,
    title: '上门部署',
    desc: '北京地区提供专业技术人员上门安装调试服务，包括NAS系统初始化、硬盘组RAID、网络配置及权限设置。',
  },
  {
    icon: HeadphonesIcon,
    title: '售后维保',
    desc: '提供硬盘与NAS设备的质保跟踪、故障诊断、数据恢复协助等全生命周期售后服务，7×12小时响应。',
  },
  {
    icon: Cloud,
    title: '云迁移服务',
    desc: '协助企业将公有云数据平滑迁移至私有NAS环境，降低长期存储成本，提升数据主权与安全性。',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
              解决方案
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              专业服务体系
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              不止于产品销售，更提供从规划到落地、从部署到运维的一站式存储服务
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="group relative rounded-2xl p-6 h-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-lg bg-brand-600/15 flex items-center justify-center mb-5 group-hover:bg-brand-600/25 transition-colors">
                    <service.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:p-10">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-3">
                  需要企业级存储方案定制？
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  我们为中小企业、设计工作室、影视制作团队、科研机构等提供专业的NAS私有云组网与数据备份方案。无论您是首次部署还是扩容升级，都可以获得免费的需求评估与方案设计。
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30 w-full sm:w-auto"
                >
                  免费咨询
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
