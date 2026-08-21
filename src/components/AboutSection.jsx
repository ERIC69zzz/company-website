import { Award, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { accentByIndex } from '../lib/accent';
import { useLanguage } from '../i18n/language';

const statIcons = [Calendar, Users, Award, MapPin];

export default function AboutSection() {
  const { copy } = useLanguage();
  const stats = copy.about.stats.map((stat, index) => ({ ...stat, icon: statIcons[index] }));

  return (
    <section id="about" className="relative overflow-x-clip py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center">
                    <Award className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{copy.about.authorized}</div>
                    <div className="text-xs text-zinc-500">{copy.about.products}</div>
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{copy.about.foundedLabel}</span>
                    <span className="text-white font-medium">{copy.about.founded}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{copy.about.locationLabel}</span>
                    <span className="text-white font-medium">{copy.about.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{copy.about.businessLabel}</span>
                    <span className="text-white font-medium">{copy.about.business}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{copy.about.coverageLabel}</span>
                    <span className="text-white font-medium">{copy.about.coverage}</span>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-brand-600/15 rounded-full blur-[60px]" />
              <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-accent-500/12 rounded-full blur-[50px]" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
                {copy.about.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {copy.about.titleStart} <span className="text-accent-400">·</span> {copy.about.titleEnd}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {copy.about.paragraph1}
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                {copy.about.paragraph2}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center"
                  >
                    <stat.icon className={`w-5 h-5 ${accentByIndex(i).icon} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link
                to="/brand"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
              >
                {copy.about.story}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
