import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { contactCards } from '../data/site';
import { accentByIndex } from '../lib/accent';
import { useLanguage } from '../i18n/language';

export default function ContactSection() {
  const { copy } = useLanguage();
  const localizedCards = contactCards.map((item, index) => ({
    ...item,
    ...copy.data.contactCards[index],
  }));

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-surface-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-4">
              {copy.contactSection.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
              {copy.contactSection.title}
            </h2>
            <p className="text-ink-2 max-w-2xl mx-auto">
              {copy.contactSection.description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {localizedCards.map((item, i) => (
              <div
                key={item.title}
                className={`${accentByIndex(i).card} rounded-2xl p-6 border border-line text-center ${accentByIndex(i).hover} transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${accentByIndex(i).iconBox} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${accentByIndex(i).icon}`} />
                </div>
                <div className="text-sm text-ink-3 mb-1">{item.title}</div>
                <div className="text-base font-bold text-ink mb-1">{item.content}</div>
                <div className="text-xs text-ink-3">{item.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 双 CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/consult"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-900 hover:bg-brand-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              {copy.contactSection.consult}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-surface-2 hover:bg-surface-3 text-ink font-semibold rounded-xl border border-line transition-all"
            >
              {copy.contactSection.details}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
