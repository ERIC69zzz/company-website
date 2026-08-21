import { Newspaper, Handshake, CalendarDays, Trophy, ExternalLink, Building2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ScrollReveal from '../components/ScrollReveal';
import zspaceNews from '../data/zspace-news.json';

// 新闻数据来自第三方 API 自动同步，渲染前再校验一次链接协议
const isSafeHref = (url) => /^https?:\/\//i.test(String(url || ''));
const safeNews = zspaceNews.filter((item) => isSafeHref(item.url));

const news = [
  {
    id: 1,
    date: '2025-04-15',
    title: '友质科技成为绿联 NAS 华北区核心授权经销商',
    desc: '正式签约绿联科技，成为 DXP 系列 NAS 产品在华北地区的核心授权经销商，为用户提供更完善的售前咨询与售后服务。',
    tag: '合作签约',
  },
  {
    id: 2,
    date: '2025-03-20',
    title: '极空间 Z4 Pro 新品首发，友质科技同步到货',
    desc: '极空间发布年度旗舰 Z4 Pro，搭载 Intel N97 处理器，友质科技作为极空间授权代理，首批产品已到店开售。',
    tag: '产品发布',
  },
  {
    id: 3,
    date: '2025-01-10',
    title: '友质科技 2024 年度客户突破 1000 家',
    desc: '截至 2024 年底，累计服务企业客户及个人用户超过 1000 家，覆盖影视制作、设计工作室、科研机构等多个领域。',
    tag: '公司动态',
  },
];

const events = [
  {
    year: '2025',
    title: '中国国际信息通信展览会',
    desc: '参展 PT Expo，展示企业级 NAS 存储方案与数据备份解决方案。',
  },
  {
    year: '2024',
    title: '绿联科技渠道合作伙伴大会',
    desc: '受邀参加绿联年度渠道大会，荣获"优秀合作伙伴"称号。',
  },
  {
    year: '2023',
    title: '极空间新品发布会 · 北京站',
    desc: '作为极空间授权代理参加新品发布会，现场签约多个企业客户。',
  },
];

const partners = [
  { name: '绿联科技', role: 'NAS 设备授权经销商' },
  { name: '极空间', role: '全系产品授权代理' },
  { name: '希捷', role: '酷狼系列企业级渠道' },
  { name: '西部数据', role: '红盘系列核心渠道' },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <PageHeader title="品牌天地" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 品牌标语 */}
        <ScrollReveal>
          <div className="text-center py-16 lg:py-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6">
              北京友质科技有限公司
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              友聚四海 <span className="text-accent-400">·</span> 质服五洲
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              始于 2010，十五年专注数据存储领域。我们不仅是产品的销售者，更是客户数据安全的守护者。以朋友般的真诚服务每一位客户，以高品质的产品与方案赢得长久信赖。
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
                <h3 className="text-xl font-bold text-white">极空间动态</h3>
                <p className="text-xs text-zinc-500 mt-0.5">同步自极空间官网媒体报道</p>
              </div>
            </div>
            {safeNews.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                暂无新闻数据
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safeNews.slice(0, 6).map((item) => (
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
                      查看原文
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
              <h3 className="text-xl font-bold text-white">公司动态</h3>
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
              <h3 className="text-xl font-bold text-white">行业足迹</h3>
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
              <h3 className="text-xl font-bold text-white">合作伙伴</h3>
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
