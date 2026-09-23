import { useLayoutEffect, useState } from 'react';

// 首屏 hydrate 期间，客户端的第一次渲染必须和预渲染的 HTML 一模一样，
// 否则 React 会丢掉静态 HTML 整块重画。本机才有的状态（保存的语言、
// 开场是否播过、地址里的查询串）都要等到这一轮之后、绘制之前再补上。
//
// 「这一轮」要以路由的 Suspense 边界为准：React 先 hydrate 根，边界里的页面
// 是之后单独一轮才 hydrate 的。所以结束信号由边界里的 <HydrationComplete />
// 发出，而不是根组件的 effect。
let hydrating = false;
const pending = new Set();

export const beginHydration = () => { hydrating = true; };

export const endHydration = () => {
  if (!hydrating) return;
  hydrating = false;
  for (const callback of pending) callback();
  pending.clear();
};

// 服务端预渲染时没有 window，同样只能用「与静态 HTML 一致」的初值
export const mustMatchServer = () => hydrating || typeof window === 'undefined';

// 整棵树 hydrate 完再执行；不在 hydrate 中则立即执行。返回取消函数，可直接作 effect 的清理。
export const whenHydrated = (callback) => {
  if (!hydrating) {
    callback();
    return () => {};
  }
  pending.add(callback);
  return () => pending.delete(callback);
};

// 放在路由 Suspense 边界里、页面之后：它的 layout effect 执行时，页面已经 hydrate 完，
// 且还没绘制，此时补上的本机状态不会闪一帧。
export function HydrationComplete() {
  useLayoutEffect(() => {
    endHydration();
  }, []);
  return null;
}

// hydrate 时第一次返回 false，整棵树 hydrate 完、绘制之前翻成 true；
// 平时（客户端路由切换）直接是 true。
export function useClientReady() {
  const [ready, setReady] = useState(() => !mustMatchServer());
  useLayoutEffect(() => whenHydrated(() => setReady(true)), []);
  return ready;
}
