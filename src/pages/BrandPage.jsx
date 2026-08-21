import { Newspaper, Handshake, CalendarDays, Trophy, ExternalLink, Building2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import zspaceNews from '../data/zspace-news.json';
import { useLanguage } from '../i18n/language';

// 新闻数据来自第三方 API 自动同步，渲染前再校验一次链接协议
const isSafeHref = (url) => /^https?:\/\//i.test(String(url || ''));
const safeNews = zspaceNews.filter((item) => isSafeHref(item.url));

const newsDates = ['2025-04-15', '2025-03-20', '2025-01-10'];
const eventYears = ['2025', '2024', '2023'];

export default function BrandPage() {
  const { copy } = useLanguage();
  const news = copy.brandPage.news.map((item, index) => ({ ...item, id: index + 1, date: newsDates[index] }));
  const events = copy.brandPage.eventItems.map((item, index) => ({ ...item, year: eventYears[index] }));
  const partners = copy.brandPage.partnerItems;
  const localizedExternalNews = safeNews.map((item) => ({
    ...item,
    ...(copy.brandPage.externalNews?.[item.id] || {}),
  }));

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title={copy.brandPage.title} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 品牌标语 */}
        <ScrollReveal>
          <div className="text-center py-16 lg:py-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6">
              {copy.brandPage.company}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {copy.brandPage.sloganStart} <span className="text-accent-400">·</span> {copy.brandPage.sloganEnd}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {copy.brandPage.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* 极空间动态 */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{copy.brandPage.zspaceNews}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{copy.brandPage.newsSource}</p>
              </div>
            </div>
            {safeNews.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                {copy.brandPage.noNews}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localizedExternalNews.slice(0, 6).map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-700/30 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-xs font-medium text-brand-300 bg-brand-900/40 border border-brand-800/40 rounded-md">
                        {item.media}
                      </span>
                      <span className="text-xs text-zinc-500">{item.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-brand-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-zinc-500 group-hover:text-brand-400 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      {copy.brandPage.original}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* 公司动态 */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{copy.brandPage.companyNews}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-700/30 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 text-xs font-medium text-brand-300 bg-brand-900/40 border border-brand-800/40 rounded-md">
                      {item.tag}
                    </span>
                    <span className="text-xs text-zinc-500">{item.date}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-3 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 行业会议 */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent-600/15 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{copy.brandPage.events}</h3>
            </div>
            <div className="space-y-6">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-8 glass-card rounded-2xl p-6 border border-white/5"
                >
                  <div className="sm:w-24 flex-shrink-0">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-accent-900/40 border border-accent-800/40">
                      <span className="text-sm font-bold text-accent-300">{event.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white mb-2">
                      {event.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 合作伙伴 */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent-600/15 flex items-center justify-center">
                <Handshake className="w-5 h-5 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{copy.brandPage.partners}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partners.map((p, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 border border-white/5 text-center hover:border-brand-700/30 transition-all"
                >
                  <Trophy className="w-6 h-6 text-accent-400 mx-auto mb-3" />
                  <div className="text-base font-bold text-white mb-1">{p.name}</div>
                  <div className="text-sm text-zinc-500">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
