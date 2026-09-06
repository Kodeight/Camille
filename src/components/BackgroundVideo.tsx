import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure strictly paused state on load
    video.pause();

    const handlePlayAttempt = () => {
      video.pause();
    };
    video.addEventListener('play', handlePlayAttempt);
    video.addEventListener('playing', handlePlayAttempt);

    // Default target time is centered
    let targetTime = 2.5;

    const tick = () => {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const current = video.currentTime;
        const diff = targetTime - current;
        // Butter-smooth interpolation towards the target cursor timestamp
        if (Math.abs(diff) > 0.002) {
          video.currentTime = current + diff * 0.15;
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // Fine hover check (Desktop cursor vs Mobile touch)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches && video.duration) {
        targetTime = video.duration / 2;
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Track cursor absolute X coordinate relative to screen width
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      // ratio from 0.0 (left side of window) to 1.0 (right side of window)
      const ratio = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      
      // Clamp boundaries slightly inwards to avoid any black screen frames at exact margins
      const minBound = 0.05;
      const maxBound = duration - 0.05;
      targetTime = minBound + ratio * (maxBound - minBound);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      video.removeEventListener('play', handlePlayAttempt);
      video.removeEventListener('playing', handlePlayAttempt);
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleInitCenterFrame = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.pause();
      video.currentTime = video.duration / 2;
    }
  };

  return (
    <div className="absolute inset-0 z-0 entrance-bg overflow-hidden pointer-events-none">
      {/* Fallback Poster Background layer */}
      <div
        id="hero-poster-fallback"
        className="absolute inset-0 w-full h-full bg-cover object-cover [background-position:center_center] lg:[background-position:68%_center] pointer-events-none"
        style={{
          backgroundImage: `url(${POSTER_URL})`,
        }}
        aria-hidden="true"
      />

      {/* Interactive Hero Video */}
      <video
        ref={videoRef}
        id="background-video"
        src={VIDEO_URL}
        poster={POSTER_URL}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        onLoadedMetadata={handleInitCenterFrame}
        onCanPlay={handleInitCenterFrame}
        className="absolute inset-0 w-full h-full object-cover [object-position:center_center] lg:[object-position:68%_center] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle cinematic vignette */}
      <div
        id="cinematic-vignette"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
              'radial-gradient(circle at 50% 45%, transparent 35%, rgba(6, 6, 8, 0.45) 85%, rgba(6, 6, 8, 0.75) 100%), linear-gradient(to right, rgba(6, 6, 8, 0.75) 0%, rgba(6, 6, 8, 0.3) 42%, transparent 70%), linear-gradient(to bottom, rgba(6, 6, 8, 0.55) 0%, transparent 18%, transparent 82%, rgba(6, 6, 8, 0.75) 100%)',
        }}
      />
    </div>
  );
};
