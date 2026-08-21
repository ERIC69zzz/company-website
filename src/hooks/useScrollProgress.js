import { useEffect, useRef, useState } from 'react';

// 返回元素在视口中的滚动进度 0..1。
// 0 = 元素顶部刚对齐视口顶部，1 = 元素底部刚离开视口底部。
// 用 rAF 节流，避免滚动时每帧重复计算导致掉帧。
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      // 可滚动距离 = 元素高度 - 一屏高度（sticky 舞台占满一屏）
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const raw = -rect.top / scrollable;
      setProgress(raw < 0 ? 0 : raw > 1 ? 1 : raw);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      // 必须归零：否则 StrictMode 的「挂载→卸载→再挂载」若跨过一次已排队的
      // rAF，重新挂载后 onScroll 会因 frame.current 仍非 0 而永久短路。
      if (frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
      }
    };
  }, [ref]);

  return progress;
}

// 是否开启了「减少动态效果」的系统偏好。
// 开启时降级为静态堆叠布局，不做钉屏和缩放。
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
