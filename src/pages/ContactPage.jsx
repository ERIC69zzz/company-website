import { company, contactCards } from '../data/site';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { accentByIndex } from '../lib/accent';
import { useLanguage } from '../i18n/language';

export default function ContactPage() {
  const { copy } = useLanguage();
  const localizedCards = contactCards.map((item, index) => ({
    ...item,
    ...copy.data.contactCards[index],
    value: copy.data.contactCards[index].content,
  }));

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title={copy.contactPage.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="text-center py-12 lg:py-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6">
              {copy.contactPage.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {copy.contactPage.heading}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              {copy.contactPage.intro}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {localizedCards.map((item, i) => (
              <div
                key={item.label}
                className={`glass-card ${accentByIndex(i).card} rounded-2xl p-6 border border-white/5 text-center ${accentByIndex(i).hover} transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${accentByIndex(i).iconBox} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${accentByIndex(i).icon}`} />
                </div>
                <div className="text-sm text-zinc-500 mb-1">{item.label}</div>
                <div className="text-base font-bold text-white mb-1">{item.value}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">{copy.contactPage.serviceTitle}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {copy.contactPage.serviceDesc}
              </p>
              <div className="space-y-2">
                {copy.contactPage.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">{copy.contactPage.emergencyTitle}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {copy.contactPage.emergencyDesc}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">{copy.contactPage.dutyPhone}</span>
                  <span className="text-white font-medium">138-0000-0000</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">{copy.contactPage.ticketEmail}</span>
                  <span className="text-white font-medium">{company.supportEmail}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">{copy.contactPage.wechat}</span>
                  <span className="text-white font-medium">{copy.contactPage.qr}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
