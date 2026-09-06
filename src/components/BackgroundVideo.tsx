import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';
// Sensitivity factor: horizontal movement across screen scrub rate
const SENSITIVITY = 1.15;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(2.58);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const isFinePointerRef = useRef<boolean>(true);
  const isHeroVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strictly ensure paused state on mount
    video.pause();

    const handlePlayAttempt = () => {
      // Immediate cancellation of any browser-initiated autoplay
      video.pause();
    };

    video.addEventListener('play', handlePlayAttempt);
    video.addEventListener('playing', handlePlayAttempt);

    // Fine pointer check (mouse vs touch)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches && video.duration) {
        // Force static center frame on mobile/touch
        const center = video.duration / 2;
        video.currentTime = center;
        targetTimeRef.current = center;
        video.pause();
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      return () => {
        video.removeEventListener('play', handlePlayAttempt);
        video.removeEventListener('playing', handlePlayAttempt);
        finePointerQuery.removeEventListener('change', handlePointerChange);
      };
    }

    // Scroll listener: pause scrubbing calculations when scrolled past hero
    const handleScroll = () => {
      isHeroVisibleRef.current = window.scrollY < window.innerHeight * 1.25;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Request seek using requestAnimationFrame without creating a seek queue
    const scheduleSeek = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const vid = videoRef.current;
        if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

        vid.pause();

        // Seek only if video is not currently decoding an in-flight seek
        if (!isSeekingRef.current && !vid.seeking) {
          const diff = Math.abs(vid.currentTime - targetTimeRef.current);
          if (diff > 0.01) {
            isSeekingRef.current = true;
            if ('fastSeek' in vid && typeof vid.fastSeek === 'function') {
              try {
                vid.fastSeek(targetTimeRef.current);
              } catch {
                vid.currentTime = targetTimeRef.current;
              }
            } else {
              vid.currentTime = targetTimeRef.current;
            }
          }
        }
      });
    };

    // Horizontal mouse tracking for desktop fine pointer
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current || !isHeroVisibleRef.current) return;

      const vid = videoRef.current;
      if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

      // Baseline establishment: first movement establishes starting anchor
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (deltaX === 0) return;

      const duration = vid.duration;
      // Moving mouse left: currentTime decreases (Camille looks left)
      // Moving mouse right: currentTime increases (Camille looks right)
      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * duration;

      // Clamp strictly inside duration so video never hits end or black frame
      const minBound = 0.08;
      const maxBound = Math.max(minBound, duration - 0.08);
      targetTimeRef.current = Math.max(minBound, Math.min(maxBound, targetTimeRef.current + timeOffset));

      scheduleSeek();
    };

    const handleMouseLeave = () => {
      // Reset anchor so re-entering window doesn't produce huge delta jump
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      video.removeEventListener('play', handlePlayAttempt);
      video.removeEventListener('playing', handlePlayAttempt);
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleInitCenterFrame = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.pause();
      const centerTime = video.duration / 2;
      video.currentTime = centerTime;
      targetTimeRef.current = centerTime;
      video.pause();
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.pause();

    // Catch up if rapid cursor movements occurred during in-flight seek
    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff > 0.015) {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          if (videoRef.current && !videoRef.current.seeking) {
            isSeekingRef.current = true;
            videoRef.current.currentTime = targetTimeRef.current;
          }
        });
      }
    }
  };

  const handleSeeking = () => {
    isSeekingRef.current = true;
  };

  return (
    <>
      {/* Fallback & Poster layer: visually centered on mobile, tailored on desktop */}
      <div
        id="hero-poster-fallback"
        className="absolute inset-0 z-0 w-full h-full bg-cover object-cover [background-position:center_center] lg:[background-position:68%_center] pointer-events-none"
        style={{
          backgroundImage: `url(${POSTER_URL})`,
        }}
        aria-hidden="true"
      />

      {/* Interactive Hero Video: paused by default, centered on mobile, scrubbed by mouse on desktop */}
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
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
        className="absolute inset-0 z-0 w-full h-full object-cover [object-position:center_center] lg:[object-position:68%_center] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle cinematic vignette */}
      <div
        id="cinematic-vignette"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 35%, rgba(6, 6, 8, 0.45) 85%, rgba(6, 6, 8, 0.75) 100%), linear-gradient(to right, rgba(6, 6, 8, 0.75) 0%, rgba(6, 6, 8, 0.3) 42%, transparent 70%), linear-gradient(to bottom, rgba(6, 6, 8, 0.55) 0%, transparent 18%, transparent 82%, rgba(6, 6, 8, 0.75) 100%)',
        }}
      />
    </>
  );
};


