import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { services } from '../data/site';
import { accentByIndex } from '../lib/accent';
import { useLanguage } from '../i18n/language';

export default function ServicesSection() {
  const { copy } = useLanguage();
  const localizedServices = services.map((service, index) => ({
    ...service,
    ...copy.data.services[index],
  }));

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
              {copy.servicesSection.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {copy.servicesSection.title}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {copy.servicesSection.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedServices.map((service, i) => {
            const tone = accentByIndex(i);
            return (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <Link to="/consult" className="block h-full group">
                <div className="relative rounded-2xl p-6 h-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:-translate-y-1">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tone.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-lg ${tone.iconBox} flex items-center justify-center mb-5 transition-colors`}>
                      <service.icon className={`w-5 h-5 ${tone.icon}`} />
                    </div>
                    <h3 className={`text-lg font-bold text-white mb-2 ${tone.title} transition-colors`}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
            );
          })}
        </div>

        {/* CTA 卡片 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10">
            <Link
              to="/consult"
              className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:p-10 hover:border-brand-700/30 hover:bg-brand-900/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between">
                <div className="lg:col-span-2 text-center lg:text-left">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {copy.servicesSection.ctaTitle}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    {copy.servicesSection.ctaDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-brand-600 group-hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30 whitespace-nowrap">
                  {copy.servicesSection.cta}
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
