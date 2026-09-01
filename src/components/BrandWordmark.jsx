const ENGLISH_NAME = 'YOUZHI';

export default function BrandWordmark({ name = '友质科技', animated = false }) {
  return (
    <span className="brand-lockup__type">
      <span className="brand-lockup__name">
        <span className={animated ? 'brand-intro__reveal' : undefined}>{name}</span>
        {animated && (
          <span className="brand-intro__contour" aria-hidden="true">{name}</span>
        )}
      </span>
      <span className="brand-lockup__english" lang="en">
        <span className="sr-only">{ENGLISH_NAME}</span>
        <span className={`brand-lockup__letters${animated ? ' brand-intro__reveal' : ''}`} aria-hidden="true">
          {Array.from(ENGLISH_NAME).map(letter => <span key={letter}>{letter}</span>)}
        </span>
        {animated && (
          <span className="brand-lockup__letters brand-intro__contour" aria-hidden="true">
            {Array.from(ENGLISH_NAME).map(letter => <span key={letter}>{letter}</span>)}
          </span>
        )}
      </span>
    </span>
  );
}
