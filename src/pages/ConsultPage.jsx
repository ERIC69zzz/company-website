import { useState } from 'react';
import { MessageCircle, Phone, User, MessageSquare } from 'lucide-react';
import { company, consultationTopics, consultationTypes, initialConsultForm } from '../data/site';
import ChatWidget from '../components/ChatWidget';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';

export default function ConsultPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialConsultForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '提交失败，请稍后重试');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title="立即咨询" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal>
            <div>
              <div className="glass-card rounded-2xl p-4 border border-white/5 mb-6">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI 智能咨询</h3>
                    <p className="text-xs text-zinc-500">先聊选型、方案和售后问题，需要人工时再留言</p>
                  </div>
                </div>
                <ChatWidget embedded />
              </div>

              <div className="glass-card rounded-2xl p-8 border border-white/5 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">微信在线咨询</h3>
                    <p className="text-xs text-zinc-500">扫码添加客服微信，实时沟通</p>
                  </div>
                </div>

                {/* 二维码占位 */}
                <div className="flex flex-col items-center py-4">
                  <div className="w-48 h-48 rounded-xl bg-white flex items-center justify-center mb-4 overflow-hidden">
                    {/* 替换为实际微信二维码图片 */}
                    <div className="text-center text-zinc-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 text-zinc-300" />
                      <p className="text-xs">请添加客服微信二维码</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 text-center">
                    微信搜索添加：<span className="text-white font-medium">{company.wechat}</span>
                  </p>
                  <p className="text-xs text-zinc-500 text-center mt-1">
                    工作时间：{company.businessDays} {company.businessHours}
                  </p>
                </div>

                <div className="h-px bg-white/5 my-6" />

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-400" />
                  <div>
                    <div className="text-sm text-zinc-400">或直接拨打</div>
                    <a href={company.telHref} className="text-lg font-bold text-white hover:text-brand-400 transition-colors">
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-3">咨询范围</h4>
                <div className="grid grid-cols-2 gap-2">
                  {consultationTopics.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">留言咨询</h3>
              <p className="text-sm text-zinc-500 mb-6">
                填写您的需求，我们将在 24 小时内与您联系
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-brand-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">提交成功</h4>
                  <p className="text-sm text-zinc-400">
                    您的咨询已收到，我们会尽快通过电话或微信与您取得联系。
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialConsultForm); }}
                    className="mt-6 px-5 py-2 text-sm font-medium text-brand-300 bg-brand-900/40 border border-brand-800/40 rounded-lg hover:bg-brand-900/60 transition-colors"
                  >
                    继续咨询
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="consult-name" className="block text-sm text-zinc-400 mb-1.5">您的姓名</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="请输入姓名"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-phone" className="block text-sm text-zinc-400 mb-1.5">联系电话</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="请输入手机号"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-type" className="block text-sm text-zinc-400 mb-1.5">咨询类型</label>
                    <select
                      id="consult-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all appearance-none"
                    >
                      {consultationTypes.map((t) => (
                        <option key={t} value={t} className="bg-dark-800">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-content" className="block text-sm text-zinc-400 mb-1.5">咨询内容</label>
                    <textarea
                      id="consult-content"
                      required
                      rows={4}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="请描述您的需求或问题..."
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-800/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
                  >
                    {submitting ? '提交中...' : '提交咨询'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
