// 纯 SVG 绘制的 NAS 设备，供滚动特写缩放使用。
// 用 SVG 而非位图，是因为特写需要放大到 2 倍以上仍然清晰；
// activeRegion 决定哪个区域高亮、其余压暗。
const REGIONS = { all: 'all', bays: 'bays', status: 'status', ports: 'ports' };

const dim = (region, active) =>
  active === REGIONS.all || active === region ? 1 : 0.28;

export default function NasDevice({ activeRegion = REGIONS.all, litBays = 4 }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="nas-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26262b" />
          <stop offset="100%" stopColor="#141417" />
        </linearGradient>
        <linearGradient id="nas-tray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1f1f24" />
          <stop offset="100%" stopColor="#2b2b32" />
        </linearGradient>
        <filter id="nas-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 机身 */}
      <rect x="50" y="20" width="300" height="260" rx="18"
            fill="url(#nas-body)" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
      <rect x="50" y="20" width="300" height="260" rx="18"
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />

      {/* 盘位区 */}
      <g opacity={dim(REGIONS.bays, activeRegion)} style={{ transition: 'opacity .4s ease' }}>
        {[0, 1, 2, 3].map((i) => {
          const y = 42 + i * 58;
          const lit = i < litBays;
          return (
            <g key={i}>
              <rect x="72" y={y} width="170" height="46" rx="7"
                    fill="url(#nas-tray)" stroke="rgba(255,255,255,0.08)" />
              {/* 抽取手柄 */}
              <rect x="82" y={y + 16} width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.16)" />
              <rect x="82" y={y + 26} width="30" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
              {/* 工作指示灯 */}
              <circle cx="228" cy={y + 23} r="4.5"
                      fill={lit ? '#5cbf3c' : '#3a3a42'}
                      filter={lit ? 'url(#nas-glow)' : undefined}
                      style={{ transition: 'fill .35s ease' }} />
            </g>
          );
        })}
      </g>

      {/* 状态灯与品牌区 */}
      <g opacity={dim(REGIONS.status, activeRegion)} style={{ transition: 'opacity .4s ease' }}>
        <rect x="262" y="42" width="66" height="120" rx="9"
              fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
        {[
          { label: 'PWR', color: '#f97316', y: 60 },
          { label: 'NET', color: '#5cbf3c', y: 88 },
          { label: 'HDD', color: '#5cbf3c', y: 116 },
        ].map((s) => (
          <g key={s.label}>
            <circle cx="278" cy={s.y} r="4" fill={s.color} filter="url(#nas-glow)" />
            <text x="290" y={s.y + 4} fontSize="9" fill="rgba(255,255,255,0.45)"
                  fontFamily="ui-monospace, monospace">{s.label}</text>
          </g>
        ))}
        <rect x="272" y="136" width="46" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
      </g>

      {/* 接口区 */}
      <g opacity={dim(REGIONS.ports, activeRegion)} style={{ transition: 'opacity .4s ease' }}>
        <rect x="262" y="178" width="66" height="80" rx="9"
              fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
        {/* 网口 */}
        <rect x="272" y="190" width="20" height="16" rx="2.5"
              fill="#15151a" stroke="rgba(92,191,60,0.55)" strokeWidth="1.2" />
        <rect x="276" y="187" width="12" height="4" rx="1" fill="rgba(92,191,60,0.55)" />
        <rect x="298" y="190" width="20" height="16" rx="2.5"
              fill="#15151a" stroke="rgba(92,191,60,0.55)" strokeWidth="1.2" />
        <rect x="302" y="187" width="12" height="4" rx="1" fill="rgba(92,191,60,0.55)" />
        {/* USB */}
        <rect x="272" y="216" width="24" height="9" rx="2" fill="#15151a" stroke="rgba(255,255,255,0.18)" />
        <rect x="272" y="232" width="24" height="9" rx="2" fill="#15151a" stroke="rgba(255,255,255,0.18)" />
        {/* HDMI */}
        <rect x="302" y="216" width="16" height="25" rx="2" fill="#15151a" stroke="rgba(249,115,22,0.45)" />
      </g>

      {/* 底部散热孔 */}
      <g opacity={activeRegion === REGIONS.all ? 0.5 : 0.15} style={{ transition: 'opacity .4s ease' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={74 + i * 14} y="268" width="7" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
        ))}
      </g>
    </svg>
  );
}

export { REGIONS };
