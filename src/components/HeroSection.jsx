import { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Server, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import NasDevice from './NasDevice';
import { useExitProgress, useReducedMotion } from '../hooks/useScrollProgress';
import { useLanguage } from '../i18n/language';

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);
const smoothstep = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

// 根据首屏设备框和钉屏设备框的实时位置计算共享元素动画。
// 位移变量直接写入视觉层，避免滚动时触发整块 Hero 的重复渲染。
function useNasHandoff(sourceRef, targetRef, reduced) {
  const frameRef = useRef(0);

  useEffect(() => {
    const source = sourceRef.current;
    const target = targetRef?.current;
    if (!source || !target) return undefined;
    const sourceVisual = source.firstElementChild;
    const visualGroup = source.closest('.hero-device-reveal');
    const story = target.closest('section');
    if (!sourceVisual || !visualGroup || !story) return undefined;

    const clearStyles = () => {
      ['--hero-shift-x', '--hero-shift-y', '--hero-scale', '--hero-opacity'].forEach((name) => {
        sourceVisual.style.removeProperty(name);
      });
      visualGroup.style.removeProperty('--hero-detail-opacity');
      visualGroup.style.removeProperty('--hero-label-shift');
      target.style.removeProperty('--nas-handoff-opacity');
      story.style.removeProperty('--nas-handoff-title-opacity');
    };

    if (reduced) {
      sourceVisual.style.setProperty('--hero-shift-x', '0px');
      sourceVisual.style.setProperty('--hero-shift-y', '0px');
      sourceVisual.style.setProperty('--hero-scale', '1');
      sourceVisual.style.setProperty('--hero-opacity', '1');
      visualGroup.style.setProperty('--hero-detail-opacity', '1');
      visualGroup.style.setProperty('--hero-label-shift', '0px');
      target.style.setProperty('--nas-handoff-opacity', '1');
      return clearStyles;
    }

    const compute = () => {
      frameRef.current = 0;

      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (sourceRect.width <= 0 || targetRect.width <= 0) return;

      const storyTop = story.getBoundingClientRect().top;
      // 把接力铺满约一屏滚动距离，避免设备在两屏交界处下坠过快。
      const start = window.innerHeight * 0.98;
      const end = 0;
      const progress = smoothstep((start - storyTop) / Math.max(start - end, 1));

      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const targetScale = targetRect.width / sourceRect.width;
      // 设备完全重合后同帧接管，避免两个 SVG 同时绘制造成重影和停顿感。
      const takeover = progress >= 1 ? 1 : 0;
      const titleOpacity = smoothstep((progress - 0.9) / 0.08);
      // 三张信息标签从设备启程开始同步渐隐，并轻微上浮。
      const detailOpacity = 1 - smoothstep(progress / 0.42);

      sourceVisual.style.setProperty('--hero-shift-x', `${(targetCenterX - sourceCenterX) * progress}px`);
      sourceVisual.style.setProperty('--hero-shift-y', `${(targetCenterY - sourceCenterY) * progress}px`);
      sourceVisual.style.setProperty('--hero-scale', String(1 + (targetScale - 1) * progress));
      sourceVisual.style.setProperty('--hero-opacity', String(1 - takeover));
      visualGroup.style.setProperty('--hero-detail-opacity', String(detailOpacity));
      visualGroup.style.setProperty('--hero-label-shift', `${(1 - detailOpacity) * -10}px`);
      target.style.setProperty('--nas-handoff-opacity', String(takeover));
      story.style.setProperty('--nas-handoff-title-opacity', String(titleOpacity));
    };

    const schedule = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      clearStyles();
    };
  }, [reduced, sourceRef, targetRef]);
}

export default function HeroSection({ handoffTargetRef }) {
  const { copy } = useLanguage();
  const sectionRef = useRef(null);
  const deviceFrameRef = useRef(null);
  const progress = useExitProgress(sectionRef);
  const reduced = useReducedMotion();
  useNasHandoff(deviceFrameRef, handoffTargetRef, reduced);

  const contentExit = reduced ? 0 : smoothstep((progress - 0.04) / 0.48);
  const deviceExit = reduced ? 0 : smoothstep((progress - 0.02) / 0.76);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-20"
    >
      <div
        className="absolute inset-0 bg-grid"
        style={{ opacity: reduced ? 0.2 : Math.max(0, 0.2 - progress * 0.2) }}
      />
      <div
        className="absolute top-[18%] left-[18%] w-80 h-80 sm:w-96 sm:h-96 bg-brand-600/20 rounded-full blur-[120px] will-change-transform"
        style={{
          opacity: reduced ? 0.55 : 0.55 - deviceExit * 0.25,
          transform: `scale(${1 + deviceExit * 0.2})`,
        }}
      />
      <div
        className="absolute bottom-[14%] right-[14%] w-72 h-72 sm:w-96 sm:h-96 bg-accent-500/12 rounded-full blur-[110px] will-change-transform"
        style={{
          opacity: reduced ? 0.45 : 0.45 + deviceExit * 0.18,
          transform: `scale(${1 + deviceExit * 0.28})`,
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div
            className="relative z-20 will-change-transform"
            style={{
              opacity: 1 - contentExit,
              transform: `translate3d(0, ${contentExit * -36}px, 0)`,
              pointerEvents: contentExit > 0.95 ? 'none' : 'auto',
            }}
          >
            <div
              className="hero-reveal-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/40 border border-brand-700/30 text-brand-300 text-xs font-medium mb-6"
              style={{ '--hero-delay': '80ms' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 hero-status-pulse" />
              {copy.hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="block overflow-hidden pb-1">
                <span
                  className="hero-title-line inline-block"
                  style={{ '--hero-delay': '150ms' }}
                >
                  {copy.hero.titleStart}{' '}
                  <span className="text-gradient">{copy.hero.titleAccent}</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  className="hero-title-line inline-block"
                  style={{ '--hero-delay': '250ms' }}
                >
                  {copy.hero.titleEnd}
                </span>
              </span>
            </h1>

            <p
              className="hero-reveal-up text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
              style={{ '--hero-delay': '360ms' }}
            >
              {copy.hero.description}
            </p>

            <div
              className="hero-reveal-up flex flex-wrap gap-4 mb-9"
              style={{ '--hero-delay': '460ms' }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-900/40 hover:shadow-brand-900/60 hover:-translate-y-0.5"
              >
                {copy.hero.products}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleScroll('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all hover:-translate-y-0.5"
              >
                {copy.hero.contact}
              </button>
            </div>

            <div
              className="hero-reveal-up flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500"
              style={{ '--hero-delay': '560ms' }}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-400" />
                <span>{copy.hero.safe}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-brand-400" />
                <span>{copy.hero.enterprise}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-400" />
                <span>{copy.hero.response}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 min-h-[230px] sm:min-h-[330px] lg:min-h-[520px] flex items-center">
            <div className="hero-device-reveal relative w-full max-w-[430px] lg:max-w-[560px] mx-auto">
              <div className="hero-handoff-details absolute inset-0">
                <div className="absolute inset-[12%] rounded-full bg-brand-500/15 blur-[70px]" />
                <div className="absolute inset-x-[12%] top-[15%] bottom-[12%] rounded-[50%] border border-white/[0.06] rotate-[-9deg]" />
                <div className="absolute inset-x-[16%] top-[18%] bottom-[15%] rounded-[50%] border border-accent-500/10 rotate-[10deg]" />
              </div>

              <div ref={deviceFrameRef} className="relative aspect-[4/3]">
                <div
                  className="hero-device-handoff absolute inset-0 z-20 will-change-transform drop-shadow-[0_35px_45px_rgba(0,0,0,0.48)]"
                >
                  <NasDevice litBays={4} />
                  <div className="hero-product-sheen absolute inset-[7%_12%] rounded-[1.4rem] pointer-events-none" />
                </div>
              </div>

              <div className="hero-handoff-labels pointer-events-none absolute inset-0 z-30">
              <div className="hero-float-card absolute left-0 top-[8%] hidden sm:flex items-center gap-3 rounded-2xl border border-white/10 bg-dark-800/75 px-4 py-3 shadow-xl shadow-black/25 backdrop-blur-xl">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600/20">
                  <Server className="h-4 w-4 text-brand-400" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-white">{copy.hero.nas}</span>
                  <span className="block text-[11px] text-zinc-500">{copy.hero.brands}</span>
                </span>
              </div>

              <div className="hero-float-card hero-float-card-late absolute right-0 top-[17%] hidden sm:block rounded-2xl border border-white/10 bg-dark-800/75 px-4 py-3 shadow-xl shadow-black/25 backdrop-blur-xl">
                <span className="block text-[11px] text-zinc-500">{copy.hero.total}</span>
                <span className="mt-0.5 block text-xl font-bold text-white">32 TB</span>
              </div>

              <div className="hero-float-card hero-float-card-last absolute right-[4%] bottom-[9%] hidden sm:flex items-center gap-3 rounded-2xl border border-white/10 bg-dark-800/75 px-4 py-3 shadow-xl shadow-black/25 backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-40 hero-status-pulse" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
                </span>
                <span>
                  <span className="block text-[11px] text-zinc-500">{copy.hero.speed}</span>
                  <span className="block text-sm font-semibold text-white">10 Gbps · {copy.hero.normal}</span>
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
