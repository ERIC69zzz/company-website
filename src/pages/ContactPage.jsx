import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Mail, Clock } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const contactInfo = [
  {
    icon: Phone,
    label: '联系电话',
    value: '133-0133-5226',
    desc: '工作日 9:00-18:00',
  },
  {
    icon: Mail,
    label: '电子邮箱',
    value: 'contact@bjyzyes.com',
    desc: '24 小时内回复',
  },
  {
    icon: MapPin,
    label: '公司地址',
    value: '北京市海淀区中关村南大街甲2号',
    desc: '欢迎上门咨询',
  },
  {
    icon: Clock,
    label: '工作时间',
    value: '周一至周六 9:00 - 18:00',
    desc: '节假日另行通知',
  },
];

export default function ContactPage() {
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
          <h1 className="text-base font-bold text-white">联系我们</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标题 */}
        <ScrollReveal>
          <div className="text-center py-12 lg:py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6">
              联系方式
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              期待与您的沟通
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              无论您是产品咨询、方案定制还是售后问题，我们随时为您提供专业支持
            </p>
          </div>
        </ScrollReveal>

        {/* 联系方式卡片 */}
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 border border-white/5 text-center hover:border-brand-700/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-brand-400" />
                </div>
                <div className="text-sm text-zinc-500 mb-1">{item.label}</div>
                <div className="text-base font-bold text-white mb-1">{item.value}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 地图占位 + 补充信息 */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">上门服务范围</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                我们在北京本地提供专业技术人员上门安装调试服务，覆盖朝阳区、海淀区、东城区、西城区、丰台区等主要区域。外地客户支持远程指导与全国发货。
              </p>
              <div className="space-y-2">
                {['NAS 系统安装与初始化', '硬盘 RAID 组态配置', '网络环境调试', '数据迁移与备份方案'].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">紧急联系方式</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                如遇紧急数据恢复或设备故障，可通过以下方式优先联系：
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">技术值班电话</span>
                  <span className="text-white font-medium">138-0000-0000</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">售后工单邮箱</span>
                  <span className="text-white font-medium">support@bjyzyes.com</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">微信客服</span>
                  <span className="text-white font-medium">扫描右侧二维码添加</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
