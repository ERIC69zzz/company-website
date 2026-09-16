import {
  ArrowRight,
  Award,
  Building2,
  Database,
  HardDrive,
  MapPin,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';
import ScrollReveal from './ScrollReveal';

const capabilityIcons = [Database, HardDrive, Wrench, MapPin];

export default function CompanyProfileSection() {
  const { copy } = useLanguage();
  const profile = copy.brandPage.profile;

  return (
    <section className="mb-20 lg:mb-24" aria-labelledby="company-profile-title">
      <ScrollReveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand-200">
                <span className="h-px w-8 bg-accent-400" aria-hidden="true" />
                {profile.eyebrow}
              </div>
              <h2 id="company-profile-title" className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
                {profile.title}
              </h2>
              <div className="mt-7 max-w-3xl space-y-5 text-sm leading-8 text-brand-100 sm:text-base">
                {profile.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {profile.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
                    <div className="text-xl font-semibold text-white sm:text-2xl">{metric.value}</div>
                    <div className="mt-1 text-xs leading-5 text-brand-200">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-line bg-surface-2 p-7 sm:p-9" aria-labelledby="company-dossier-title">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 id="company-dossier-title" className="text-xl font-semibold text-ink">{profile.dossierTitle}</h3>
            </div>
            <dl>
              {profile.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line py-4 first:border-t-0 first:pt-0">
                  <dt className="text-xs text-ink-3">{fact.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium leading-6 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-14">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-accent-700">
              <Award className="h-4 w-4" aria-hidden="true" />
              {profile.capabilitiesLabel}
            </div>
            <h3 className="text-2xl font-semibold text-ink sm:text-3xl">{profile.capabilitiesTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-2">{profile.capabilitiesIntro}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {profile.capabilities.map((capability, index) => {
              const Icon = capabilityIcons[index];
              return (
                <article key={capability.title} className="rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-brand-900/5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 text-base font-semibold text-ink">{capability.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-ink-2">{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="mt-10 grid overflow-hidden rounded-3xl border border-line bg-surface-2 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-9 lg:p-10">
            <h3 className="text-2xl font-semibold text-ink">{profile.reachTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-2">{profile.reachDescription}</p>
            <div className="mt-6">
              <div className="text-xs font-medium text-ink-3">{profile.industriesLabel}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.industries.map((industry) => (
                  <span key={industry} className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-ink-2">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-surface p-7 sm:p-9 lg:p-10">
            <div className="text-xs font-semibold tracking-[0.16em] text-accent-700">{profile.visionLabel}</div>
            <h3 className="mt-3 text-2xl font-semibold leading-snug text-brand-900">{profile.visionTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-ink-2">{profile.visionDescription}</p>
            <Link to="/consult" className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800">
              {profile.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
