import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const contactInfo = [
  {
    icon: Phone,
    title: '电话咨询',
    content: '133-0133-5226',
    desc: '工作日 9:00 - 18:00',
  },
  {
    icon: MapPin,
    title: '公司地址',
    content: '北京市海淀区中关村南大街甲2号',
    desc: '数码大厦B座901',
  },
  {
    icon: Mail,
    title: '电子邮箱',
    content: 'contact@youzhikeji.com',
    desc: '24小时内回复',
  },
  {
    icon: Clock,
    title: '营业时间',
    content: '周一至周六',
    desc: '09:00 - 18:00',
  },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', company: '', need: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', company: '', need: '' });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
              联系我们
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              开启您的存储升级之旅
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              无论您是个人扩容还是企业部署，我们都将为您提供专业的建议与优质的服务
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-sm text-brand-300 mb-0.5">{item.content}</div>
                    <div className="text-xs text-zinc-500">{item.desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-6">在线留言</h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" />
                  <div className="text-lg font-semibold text-white mb-2">提交成功</div>
                  <div className="text-sm text-zinc-400">
                    我们会尽快与您取得联系，感谢信任！
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        您的姓名
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600/30 transition-colors"
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        联系电话
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600/30 transition-colors"
                        placeholder="请输入手机号"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      公司名称（选填）
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600/30 transition-colors"
                      placeholder="请输入公司名称"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      需求描述
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.need}
                      onChange={(e) => setForm({ ...form, need: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600/30 transition-colors resize-none"
                      placeholder="请描述您的存储需求，如硬盘容量、NAS盘位数、使用场景等"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
                  >
                    <Send className="w-4 h-4" />
                    提交咨询
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
