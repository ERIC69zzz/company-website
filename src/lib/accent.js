// 蓝橙双色交替配色，呼应公司 logo 的两种主色。
// 蓝为主、橙为辅：橙色在 logo 里占比小，铺开用会盖过标识。
//
// 注意：Tailwind 只扫描源码里的完整字面量 class，
// 所以这里必须写成完整字符串，不能拼接。
const palettes = [
  {
    key: 'brand',
    iconBox: 'bg-brand-50 group-hover:bg-brand-100',
    icon: 'text-brand-600',
    title: 'group-hover:text-brand-700',
    glow: 'from-brand-100',
    badge: 'bg-brand-50 text-brand-700',
    hover: 'hover:border-brand-200',
    card: 'panel panel-raised',
  },
  {
    key: 'accent',
    iconBox: 'bg-accent-50 group-hover:bg-accent-100',
    icon: 'text-accent-600',
    title: 'group-hover:text-accent-700',
    glow: 'from-accent-100',
    badge: 'bg-accent-50 text-accent-700',
    hover: 'hover:border-accent-200',
    card: 'panel panel-raised',
  },
];

export const accentByIndex = (index) => palettes[index % palettes.length];
