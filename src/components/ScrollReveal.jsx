import { useLayoutEffect, useRef, useState } from 'react';

// 内容默认就该是可见的，只有确实落在首屏之下的元素才停在透明态等入场动画。
//
// 此前一律从 opacity: 0 起步、靠 IntersectionObserver 点亮，有两个后果：
//   1. 首屏内的内容也会缺一帧 —— IO 回调发生在首次绘制之后
//   2. 标签页不可见时 IO 根本不回调，页面会一直空白到用户切回前台
//      （与品牌开场卡死是同一个病灶，见 HeroSection）
export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  // useLayoutEffect 在绘制前跑完，首屏内的元素因此不会闪一下
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const belowFold = el.getBoundingClientRect().top > window.innerHeight;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 看不到的动画不值得等
    if (!belowFold || reduceMotion || document.hidden || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    setAnimated(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    // 切到后台后 IO 不再回调，直接显示，避免回到前台前一直空着
    const revealWhenHidden = () => {
      if (!document.hidden) return;
      setVisible(true);
      observer.disconnect();
    };
    document.addEventListener('visibilitychange', revealWhenHidden);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', revealWhenHidden);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: animated
          ? `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
