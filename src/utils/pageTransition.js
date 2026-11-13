import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadRoute } from '../routes';

// 顶部导航切换页面时的过渡动画，用浏览器原生的 View Transitions API。
//
// React Router 自带的 viewTransition 只支持数据路由（RouterProvider），我们用的是
// BrowserRouter，它把每次导航包在 React.startTransition 里、稍后才提交，
// 用 flushSync 也逼不出同步更新。所以这里换个做法：startViewTransition 的回调
// 返回一个 Promise，等 React 把新页面真正提交到 DOM（下面 RouteCommitSignal 的
// layout effect）再兑现，浏览器才去截新画面。
//
// 不支持该 API 的浏览器、开启了「减少动态效果」的访客，直接跳转，没有动画。

// 新页面迟迟没有提交时（极端情况），最多冻结画面这么久就放行
const MAX_WAIT_MS = 1000;

// 过渡迟迟没有开始时，等这么久就放弃动画、直接跳转
const START_TIMEOUT_MS = 250;

let finishPending = null;

const canAnimate = () => (
  typeof document !== 'undefined'
  && typeof document.startViewTransition === 'function'
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const settle = () => {
  finishPending?.();
  finishPending = null;
};

export async function navigateWithTransition(navigate, to) {
  if (!canAnimate()) {
    navigate(to);
    return;
  }

  // 先把目标页的 chunk 拉下来：过渡期间画面是冻住的，边等下载边冻着就成了「点了没反应」。
  // 悬停时通常已经预取过，这里基本是现成的。
  const { pathname } = new URL(to, window.location.origin);
  await preloadRoute(pathname).catch(() => {});

  settle();

  // 跳转必须发生且只发生一次。浏览器要等到下一帧才调用 startViewTransition 的回调，
  // 页面不出帧时（窗口被遮住、标签页刚切走）回调可能一直不来，点击就成了没反应；
  // 所以等不到就直接跳，回调晚到时不再重复跳转。
  let navigated = false;
  const go = () => {
    if (navigated) return false;
    navigated = true;
    navigate(to);
    return true;
  };
  const fallback = setTimeout(go, START_TIMEOUT_MS);

  const transition = document.startViewTransition(() => new Promise((resolve) => {
    clearTimeout(fallback);
    if (!go()) {
      resolve();
      return;
    }
    finishPending = resolve;
    setTimeout(resolve, MAX_WAIT_MS);
  }));
  // 浏览器跳过动画时（页面不可见、又被新的过渡打断）ready 会 reject，
  // 页面照样换了，只是没有动画，不算错误
  transition.ready.catch(() => {});
}

// 悬停或聚焦到导航项时预取目标页，点下去时过渡能立刻开始
export const prefetchRoute = (to) => {
  const { pathname } = new URL(to, window.location.origin);
  preloadRoute(pathname).catch(() => {});
};

// 放在路由器里、Suspense 之外：location 一变，说明新页面已经提交到 DOM
export function RouteCommitSignal() {
  const { key } = useLocation();
  useLayoutEffect(() => {
    settle();
  }, [key]);
  return null;
}
