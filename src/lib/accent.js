// 橙绿双色交替配色，呼应公司 logo 的两种主色。
// 注意：Tailwind 只扫描源码里的完整字面量 class，
// 所以这里必须写成完整字符串，不能拼接。
const palettes = [
  {
    key: 'brand',
    iconBox: 'bg-brand-600/15 group-hover:bg-brand-600/25',
    icon: 'text-brand-400',
    title: 'group-hover:text-brand-300',
    glow: 'from-brand-600/10',
    badge: 'bg-brand-900/40 border-brand-700/30 text-brand-300',
    hover: 'hover:border-brand-700/30',
    card: 'glass-card',
  },
  {
    key: 'accent',
    iconBox: 'bg-accent-600/15 group-hover:bg-accent-600/25',
    icon: 'text-accent-400',
    title: 'group-hover:text-accent-300',
    glow: 'from-accent-600/10',
    badge: 'bg-accent-900/40 border-accent-700/30 text-accent-300',
    hover: 'hover:border-accent-700/30',
    card: 'glass-card glass-card-accent',
  },
];

export const accentByIndex = (index) => palettes[index % palettes.length];
