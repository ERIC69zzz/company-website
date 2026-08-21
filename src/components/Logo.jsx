import { useState } from 'react';

// 公司标识的内联回退图形：橙绿双色圆环 + 深青色中心，
// 与 logo 主色一致。当 public/logo.png 尚未放入或加载失败时使用，
// 避免出现破图。
export function LogoMark({ className = 'w-9 h-9', alt = '友质科技' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <linearGradient id="youzhi-orange" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="youzhi-green" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78d052" />
          <stop offset="100%" stopColor="#46a02b" />
        </linearGradient>
      </defs>
      <path
        d="M9.5 30.76A16 16 0 1 1 38.5 30.76"
        fill="none"
        stroke="url(#youzhi-orange)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M39.45 28.14A16 16 0 0 1 8.55 28.14"
        fill="none"
        stroke="url(#youzhi-green)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="7.5" fill="#10393d" />
      <circle cx="24" cy="24" r="3.4" fill="#5cbf3c" />
    </svg>
  );
}

export default function Logo({ className = 'w-9 h-9', alt = '友质科技' }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <LogoMark className={className} alt={alt} />;
  }

  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
}
