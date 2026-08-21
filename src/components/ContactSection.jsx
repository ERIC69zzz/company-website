import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { contactCards } from '../data/site';
import { accentByIndex } from '../lib/accent';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-dark-800/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-900/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-4">
              联系我们
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              开启您的存储升级之旅
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              无论您是个人扩容还是企业部署，我们都将为您提供专业的建议与优质的服务
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactCards.map((item, i) => (
              <div
                key={item.title}
                className={`glass-card ${accentByIndex(i).card} rounded-2xl p-6 border border-white/5 text-center ${accentByIndex(i).hover} transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${accentByIndex(i).iconBox} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 ${accentByIndex(i).icon}`} />
                </div>
                <div className="text-sm text-zinc-500 mb-1">{item.title}</div>
                <div className="text-base font-bold text-white mb-1">{item.content}</div>
                <div className="text-xs text-zinc-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 双 CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/consult"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              立即咨询
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
            >
              查看联系方式
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
