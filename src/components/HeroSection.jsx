import { useEffect, useRef } from 'react';
import Logo from './Logo';
import BrandWordmark from './BrandWordmark';

const INTRO_NAME = '友质科技';
const DOCK_DURATION = 1150;

export default function HeroSection({ brandTargetRef, onDock, onComplete }) {
  const introRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let finished = false;
    let pauseTimer;
    let resizeFrame;
    let dockingAnimation;

    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      clearTimeout(pauseTimer);
      onComplete();
    };

    const getDockKeyframes = () => {
      // 外层保留未缩放的布局框，窗口变化时仍能取得准确的起点。
      const origin = intro.querySelector('.brand-intro__placement').getBoundingClientRect();
      const destination = brandTargetRef.current.closest('a').getBoundingClientRect();
      return [
        { transform: 'translate(0, 0) scale(1)', transformOrigin: 'top left' },
        {
          transform: `translate(${destination.left - origin.left}px, ${destination.top - origin.top}px) scale(${destination.height / origin.height})`,
          transformOrigin: 'top left',
        },
      ];
    };

    const dock = () => {
      if (disposed || finished) return;
      const composition = intro.querySelector('.brand-intro__composition');
      const target = brandTargetRef.current?.closest('a');
      if (!target || motionPreference.matches || !composition.getBoundingClientRect().height || !target.getBoundingClientRect().height) {
        finish();
        return;
      }

      // 开场与导航共用图文比例，整体缩放即可落位，不再单独调整字距和 Logo。
      onDock();
      dockingAnimation = composition.animate(getDockKeyframes(), {
        duration: DOCK_DURATION,
        easing: 'cubic-bezier(0.65, 0, 0.25, 1)',
        fill: 'forwards',
      });
      dockingAnimation.finished.then(finish, finish);
    };

    const onWheel = event => {
      if (event.deltaX || event.deltaY) finish();
    };
    const onResize = () => {
      if (resizeFrame || !dockingAnimation) return;
      // 页面初始化和移动端浏览器也会触发 resize，只更新落点，不跳过开场。
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = undefined;
        if (disposed || finished) return;
        dockingAnimation.effect.setKeyframes(getDockKeyframes());
      });
    };
    const onKeyDown = event => {
      if (!['Tab', 'Escape', ' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) return;
      if (event.key === 'Tab') {
        event.preventDefault();
        // 先开放导航，再把键盘焦点交给品牌链接，避免跳到页尾。
        requestAnimationFrame(() => brandTargetRef.current?.closest('a')?.focus());
      }
      finish();
    };

    // scroll 也可能来自刷新恢复位置或布局变化，不能作为用户跳过的依据。
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', finish, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    motionPreference.addEventListener('change', finish);

    // 等实际入场动画全部完成后稍作停留，避免时长调整后提前移位。
    if (!intro.getAnimations || !intro.animate || motionPreference.matches) {
      pauseTimer = setTimeout(finish, 0);
    } else {
      const entranceAnimations = intro.getAnimations({ subtree: true });
      Promise.allSettled(entranceAnimations.map(animation => animation.finished)).then(() => {
        if (!disposed && !finished) pauseTimer = setTimeout(dock, 420);
      });
    }

    return () => {
      disposed = true;
      clearTimeout(pauseTimer);
      cancelAnimationFrame(resizeFrame);
      dockingAnimation?.cancel();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', finish);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      motionPreference.removeEventListener('change', finish);
    };
  }, [brandTargetRef, onDock, onComplete]);

  return (
    <section ref={introRef} className="brand-intro" aria-label="品牌开场">
      <div className="brand-intro__backdrop" aria-hidden="true" />
      <div className="brand-intro__placement">
        <div className="brand-lockup brand-intro__composition">
          <div className="brand-lockup__logo brand-intro__reveal" aria-hidden="true">
            <Logo className="block h-full w-full" />
          </div>
          <h1 className="brand-intro__wordmark" lang="zh-CN">
            <BrandWordmark name={INTRO_NAME} animated />
          </h1>
        </div>
      </div>
    </section>
  );
}
