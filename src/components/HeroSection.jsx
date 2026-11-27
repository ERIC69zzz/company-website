import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/language';

export default function HeroSection() {
  const { copy } = useLanguage();
  const s = copy.business.home;
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = () => {
      if (motion.matches) video.pause();
      else video.play().catch(() => {}); // 浏览器限制自动播放时保留手动播放入口。
    };
    applyPreference();
    motion.addEventListener('change', applyPreference);
    return () => motion.removeEventListener('change', applyPreference);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <video
        ref={videoRef}
        className="home-hero__background"
        src="/media/home-loop.mp4"
        poster="/media/home-loop.webp"
        preload="none"
        aria-hidden="true"
        muted
        loop
        playsInline
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="home-hero__foreground">
        <div className="home-hero__copy">
          <h1 id="home-hero-title">{s.title}</h1>
          <p>{s.description}</p>
          <div className="home-hero__actions">
            <Link to="/products" className="home-hero__primary">{s.allProducts}<ArrowRight aria-hidden="true" /></Link>
            <Link to="/consult" className="home-hero__secondary">{s.consult}<ChevronRight aria-hidden="true" /></Link>
          </div>
        </div>
        <button type="button" className="home-hero__playback" onClick={togglePlayback}
          aria-label={playing ? s.pauseVideo : s.playVideo} title={playing ? s.pauseVideo : s.playVideo}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
