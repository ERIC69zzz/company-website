import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/language';
import { useScrollProgress, useReducedMotion } from '../hooks/useScrollProgress';
import NasDevice, { REGIONS } from './NasDevice';

// 每个阶段对应设备的一次镜头运动 + 一块文案。
// scale/x/y 是相对 SVG 舞台的变换，逐帧插值以获得连续的推拉感。
const STAGES = [
  { key: 'whole', region: REGIONS.all, litBays: 4, scale: 1, x: 0, y: 0 },
  { key: 'bays', region: REGIONS.bays, litBays: 4, scale: 2.05, x: 8, y: 2 },
  { key: 'ports', region: REGIONS.ports, litBays: 4, scale: 2.35, x: -22, y: -20 },
  { key: 'system', region: REGIONS.status, litBays: 4, scale: 1.9, x: -20, y: 12 },
];

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
// 缓动，让镜头在每个阶段停顿、切换时加速，接近 Apple 的节奏
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ScrollStory({ deviceTargetRef }) {
  const { copy } = useLanguage();
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const reduced = useReducedMotion();

  // 窄屏收敛推近幅度：桌面端 2.35 倍的特写在手机上会盖住文案
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const s = copy.showcase;
  const panels = STAGES.map((stage) => s.stages[stage.key]);

  // 减少动态效果：降级为普通堆叠，不钉屏、不缩放
  if (reduced) {
    return (
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">{s.title}</h2>
          <p className="text-ink-2 mb-12">{s.subtitle}</p>
          <div ref={deviceTargetRef} className="w-full max-w-sm mx-auto mb-12">
            <NasDevice activeRegion={REGIONS.all} litBays={4} />
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {panels.map((p) => (
              <div key={p.title}>
                <div className="text-xs font-medium text-brand-600 mb-2">{p.eyebrow}</div>
                <h3 className="text-xl font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 把 0..1 映射到阶段区间，取相邻两帧插值
  const t = progress * (STAGES.length - 1);
  const i = Math.min(STAGES.length - 2, Math.floor(t));
  const f = easeInOut(clamp01(t - i));
  const from = STAGES[i];
  const to = STAGES[i + 1];

  const zoom = narrow ? 0.55 : 1;
  // 以 1 为基准缩放推近幅度，保证整机阶段两端都是 scale(1)
  const scale = 1 + (lerp(from.scale, to.scale, f) - 1) * zoom;
  const x = lerp(from.x, to.x, f) * zoom;
  const y = lerp(from.y, to.y, f) * zoom;
  const active = f < 0.5 ? from : to;

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] md:h-[420vh]"
      aria-label={s.title}
    >
      <div
        className="pointer-events-none absolute -top-60 left-1/2 h-[30rem] w-full -translate-x-1/2 rounded-full bg-brand-500/[0.065] blur-[140px]"
        aria-hidden="true"
      />
      <div className="sticky top-0 h-screen">
        <div
          className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-colors duration-700"
          style={{ background: active.region === REGIONS.ports ? 'rgba(92,191,60,0.10)' : 'rgba(249,115,22,0.10)' }}
        />

        <div className="absolute inset-0 overflow-hidden flex items-center">
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题：进入时淡出，把注意力交给特写 */}
          <div
            className="absolute z-30 inset-x-0 -top-24 lg:-top-16 text-center px-4"
            style={{
              opacity: `calc(var(--nas-handoff-title-opacity, 0) * ${clamp01(1 - progress * 6)})`,
              transition: 'opacity .2s linear',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-2">{s.title}</h2>
            <p className="text-ink-2 text-sm">{s.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            {/* 设备舞台 */}
            <div
              ref={deviceTargetRef}
              className="nas-handoff-target relative aspect-[4/3] max-w-[260px] sm:max-w-sm lg:max-w-lg mx-auto w-full"
            >
              <div
                className="absolute inset-0 will-change-transform drop-shadow-[0_35px_45px_rgba(0,0,0,0.48)]"
                style={{
                  transform: `scale(${scale}) translate(${x}%, ${y}%)`,
                  opacity: 'var(--nas-handoff-opacity, 0)',
                }}
              >
                <NasDevice activeRegion={active.region} litBays={active.litBays} />
              </div>
            </div>

            {/* 文案面板：按与当前阶段的距离交叉淡入淡出 */}
            <div className="relative h-48 sm:h-56 lg:h-64">
              {panels.map((p, idx) => {
                const d = Math.abs(t - idx);
                const opacity = clamp01(1 - d / 0.65);
                return (
                  <div
                    key={p.title}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity,
                      transform: `translateY(${(t - idx) * -22}px)`,
                      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                    }}
                  >
                    <div className="text-xs font-medium tracking-wider text-brand-600 mb-3">
                      {p.eyebrow}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink mb-4 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-ink-2 leading-relaxed max-w-md">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 阶段进度指示 */}
          <div className="absolute -bottom-14 lg:-bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {STAGES.map((stage, idx) => (
              <span
                key={stage.key}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: Math.abs(t - idx) < 0.5 ? 28 : 10,
                  background: Math.abs(t - idx) < 0.5 ? '#f97316' : 'rgba(255,255,255,0.18)',
                }}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
