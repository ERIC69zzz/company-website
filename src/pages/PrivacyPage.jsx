import { useLanguage } from '../i18n/language';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import { company } from '../data/site';

export default function PrivacyPage() {
  const { copy } = useLanguage();
  const p = copy.privacyPage;

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title={p.title} maxWidth="max-w-4xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="py-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{p.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{p.intro}</p>
            <p className="text-xs text-zinc-600 mt-4">
              {p.updatedLabel}：{p.updated}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-10">
          {p.sections.map((section, i) => (
            <ScrollReveal key={section.heading} delay={i * 0.05}>
              <section className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">
                  {i + 1}. {section.heading}
                </h3>
                <div className="space-y-3">
                  {section.paragraphs.map((text) => (
                    <p key={text} className="text-sm text-zinc-400 leading-relaxed">
                      {text}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="space-y-2 pt-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-zinc-400 leading-relaxed flex gap-2">
                          <span className="text-brand-400 shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 rounded-2xl border border-brand-700/25 bg-brand-900/10 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-3">{p.contactHeading}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">{p.contactDesc}</p>
            <div className="space-y-1.5 text-sm">
              <div className="text-zinc-300">{company.fullName}</div>
              <div className="text-zinc-400">
                {company.address} {company.addressDetail}
              </div>
              <div className="text-zinc-400">
                {p.phoneLabel}：
                <a href={company.telHref} className="text-brand-400 hover:text-brand-300">
                  {company.phone}
                </a>
              </div>
              <div className="text-zinc-400">
                {p.emailLabel}：
                <a href={`mailto:${company.email}`} className="text-brand-400 hover:text-brand-300">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
