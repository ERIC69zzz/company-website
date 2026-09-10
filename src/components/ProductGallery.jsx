import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 大图轮播。滑动交给 CSS scroll-snap 而不是手写 touch 事件：
// 触摸的惯性、回弹、触控板横向滚动都由浏览器负责，行为和原生一致。
// 只有一张图时不渲染任何控件，退化成一张静态大图。
export default function ProductGallery({ images, alt, copy }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const multiple = images.length > 1;

  // 滑动位置反推当前张数，让指示点和读屏提示跟着走。
  // 不用 requestAnimationFrame 节流：一次除法不值得节流，而 rAF 在
  // 标签页不可见时不触发，会把节流标记永久卡住、指示点再也不更新。
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !multiple) return undefined;

    const onScroll = () => {
      const width = track.clientWidth || 1;
      setIndex(Math.round(track.scrollLeft / width));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [multiple]);

  const scrollTo = (next) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, next));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); scrollTo(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); scrollTo(index + 1); }
  };

  return (
    <div className="gallery">
      <div
        ref={trackRef}
        className="gallery__track"
        // 多图时可聚焦，方向键即可翻页
        tabIndex={multiple ? 0 : undefined}
        role={multiple ? 'group' : undefined}
        aria-label={multiple ? copy.galleryLabel : undefined}
        onKeyDown={multiple ? onKeyDown : undefined}
      >
        {images.map((src, i) => (
          <div key={src} className="gallery__slide">
            <img
              src={src}
              alt={images.length > 1 ? `${alt} (${i + 1}/${images.length})` : alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {multiple && (
        <>
          <button
            type="button"
            className="gallery__arrow gallery__arrow--prev"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label={copy.prevImage}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery__arrow gallery__arrow--next"
            onClick={() => scrollTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label={copy.nextImage}
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="gallery__dots">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`gallery__dot${i === index ? ' is-active' : ''}`}
                onClick={() => scrollTo(i)}
                aria-current={i === index}
                aria-label={copy.imageOf
                  .replace('{current}', String(i + 1))
                  .replace('{total}', String(images.length))}
              />
            ))}
          </div>

          {/* 张数变化通过这里播报，不用把整块图片区域包进 live region */}
          <p className="gallery__counter" aria-live="polite">
            {copy.imageOf
              .replace('{current}', String(index + 1))
              .replace('{total}', String(images.length))}
          </p>
        </>
      )}
    </div>
  );
}
