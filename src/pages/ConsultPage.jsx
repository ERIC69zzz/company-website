import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Phone, User, CheckCircle2 } from 'lucide-react';
import { company, initialConsultForm } from '../data/site';
import WechatQr from '../components/WechatQr';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../i18n/language';

export default function ConsultPage() {
  const { language, copy } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialConsultForm);
  // 蜜罐字段与渲染时刻，用于识别自动化提交，对真人无感
  const [fax, setFax] = useState('');
  // 在 effect 里取时间，避免 render 期间调用非纯函数。
  // 初值 0 会让服务端的耗时检查放行，属于安全的失败方向。
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language, fax, renderedAt: renderedAt.current }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || copy.consultPage.submitError);
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
      <PageHeader title={copy.consultPage.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal>
            <div>
              <div className="glass-card rounded-2xl p-8 border border-white/5 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{copy.consultPage.wechatTitle}</h3>
                    <p className="text-xs text-zinc-500">{copy.consultPage.wechatDesc}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center py-4">
                  <WechatQr alt={copy.consultPage.wechatTitle} fallbackText={copy.consultPage.qr} />
                  <p className="text-sm text-zinc-400 text-center">
                    {copy.consultPage.scanHint}
                  </p>
                  <p className="text-xs text-zinc-500 text-center mt-1">
                    {copy.consultPage.hours}{copy.data.businessDays} {company.businessHours}
                  </p>
                </div>

                <div className="h-px bg-white/5 my-6" />

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-400" />
                  <div>
                    <div className="text-sm text-zinc-400">{copy.consultPage.call}</div>
                    <a href={company.telHref} className="text-lg font-bold text-white hover:text-brand-400 transition-colors">
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-3">{copy.consultPage.scope}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {copy.data.consultationTopics.map((t) => (
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
              <h3 className="text-lg font-bold text-white mb-2">{copy.consultPage.formTitle}</h3>
              <p className="text-sm text-zinc-500 mb-6">
                {copy.consultPage.formDesc}
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent-600/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-accent-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{copy.consultPage.successTitle}</h4>
                  <p className="text-sm text-zinc-400">
                    {copy.consultPage.successDesc}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialConsultForm); }}
                    className="mt-6 px-5 py-2 text-sm font-medium text-accent-300 bg-accent-900/40 border border-accent-800/40 rounded-lg hover:bg-accent-900/60 transition-colors"
                  >
                    {copy.consultPage.continue}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* 蜜罐：视觉隐藏但不用 display:none，真人看不到也 Tab 不到。
                      autocomplete="off" 防止密码管理器误填。 */}
                  <input
                    type="text"
                    name="fax"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
                  />
                  <div>
                    <label htmlFor="consult-name" className="block text-sm text-zinc-400 mb-1.5">{copy.consultPage.name}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={copy.consultPage.namePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-phone" className="block text-sm text-zinc-400 mb-1.5">{copy.consultPage.phone}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={copy.consultPage.phonePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-type" className="block text-sm text-zinc-400 mb-1.5">{copy.consultPage.type}</label>
                    <select
                      id="consult-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-600/50 focus:ring-1 focus:ring-brand-600/20 transition-all appearance-none"
                    >
                      {copy.data.consultationTypes.map((item) => (
                        <option key={item.value} value={item.value} className="bg-dark-800">{item.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-content" className="block text-sm text-zinc-400 mb-1.5">{copy.consultPage.content}</label>
                    <textarea
                      id="consult-content"
                      required
                      rows={4}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder={copy.consultPage.contentPlaceholder}
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
                    {submitting ? copy.consultPage.submitting : copy.consultPage.submit}
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
