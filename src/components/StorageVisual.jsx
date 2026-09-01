import { useId } from 'react';

// Category illustrations, not photographs of a particular product or SKU.
export default function StorageVisual({ kind, className = '' }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 240 190" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x2="1" y2="1">
          <stop stopColor={kind === 'nas' ? '#414851' : '#e4e8ed'} />
          <stop offset=".48" stopColor={kind === 'nas' ? '#292e35' : '#f7f8fa'} />
          <stop offset="1" stopColor={kind === 'nas' ? '#171c23' : '#aeb7c1'} />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="172" rx="72" ry="6" fill="#0d2340" opacity=".06" />
      {kind === 'hdd' && (
        <g transform="translate(21 2) rotate(-9 100 85)">
          <rect x="49" y="14" width="104" height="148" rx="9" fill="#545b64" />
          <rect x="45" y="10" width="104" height="148" rx="9" fill={`url(#${gradientId})`} stroke="#9da6af" />
          <rect x="54" y="24" width="86" height="116" rx="3" fill="#fff" />
          <path d="M54 24h86v24H54z" fill="#0d2340" />
          <path d="M64 36h31" stroke="#fff" strokeWidth="3" />
          <path d="M65 62h48" stroke="#313d49" strokeWidth="4" />
          <path d="M65 74h59m-59 8h42" stroke="#b1bac3" strokeWidth="3" />
          <path d="M65 98h61v24H65z" fill="#f1f3f5" />
          <path d="M69 102v16m4-16v16m3-16v16m5-16v16m4-16v16m6-16v16m4-16v16m3-16v16m6-16v16m4-16v16m4-16v16m4-16v16" stroke="#45505a" />
          {[[52, 17], [142, 17], [52, 151], [142, 151]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="#7c8792" />)}
        </g>
      )}
      {kind === 'ssd' && (
        <g transform="translate(20 3) rotate(-18 100 90)">
          <path d="M13 61h171v60H13V99H6V81h7z" fill="#24465a" />
          <rect x="17" y="65" width="158" height="52" rx="2" fill="#1b3443" />
          <rect x="25" y="71" width="67" height="39" rx="3" fill="#15191f" />
          <rect x="99" y="71" width="31" height="39" rx="2" fill="#20252b" />
          <rect x="136" y="71" width="30" height="39" rx="2" fill="#20252b" />
          <path d="M32 80h36" stroke="#f8f9fb" strokeWidth="4" />
          <path d="M32 91h27m-27 8h41" stroke="#aeb8c1" strokeWidth="2" />
          <path d="M178 65v18m4-18v18m-4 8v27m4-27v27" stroke="#c9a757" strokeWidth="2" />
          <circle cx="13" cy="90" r="3" fill="#c5b785" />
          <path d="M24 115h5m67 0h6m31 0h5" stroke="#cfbb85" />
        </g>
      )}
      {kind === 'nas' && (
        <g transform="translate(17 3)">
          <path d="M150 28l25 13v113l-25 10z" fill="#3b434d" />
          <rect x="32" y="27" width="122" height="139" rx="10" fill={`url(#${gradientId})`} stroke="#5b626b" />
          {[43, 69, 95, 121].map((x) => (
            <g key={x}>
              <rect x={x} y="49" width="21" height="98" rx="4" fill="#292e35" stroke="#515760" />
              <path d={`M${x + 6} 134h9`} stroke="#949ba3" strokeWidth="2" />
              <circle cx={x + 11} cy="57" r="1.5" fill="#96b6ab" />
            </g>
          ))}
          <circle cx="139" cy="39" r="2" fill="#ff6a00" />
          <path d="M46 155h17" stroke="#737d89" strokeWidth="2" />
        </g>
      )}
      {kind === 'enterprise' && (
        <g transform="rotate(-12 120 95)">
          <path d="M62 24h103l12 10v129H62z" fill="#7c8998" />
          <rect x="56" y="18" width="111" height="139" rx="6" fill={`url(#${gradientId})`} stroke="#aab4c0" />
          <path d="M66 25h89M66 30h89M66 36h89M66 140h89M66 146h89" stroke="#8894a3" strokeWidth="1.5" />
          <rect x="67" y="48" width="89" height="78" rx="2" fill="#0d2340" />
          <path d="M77 62h43" stroke="#fff" strokeWidth="4" />
          <path d="M77 75h58m-58 7h39" stroke="#95a7bd" strokeWidth="2" />
          <path d="M77 108h33" stroke="#ff6a00" strokeWidth="3" />
          <path d="M124 158h29v5h-29z" fill="#303a46" />
          <path d="M127 160h23" stroke="#c9a757" strokeWidth="2" />
          {[[61, 23], [162, 23], [61, 152], [162, 152]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="#667586" />)}
        </g>
      )}
    </svg>
  );
}
