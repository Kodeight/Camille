import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';
// Sensitivity factor: maps horizontal cursor movement across screen width to video duration
const SENSITIVITY = 1.15;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(2.58);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const isFinePointerRef = useRef<boolean>(true);
  const isHeroVisibleRef = useRef<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Strictly prevent any spontaneous autoplay or playback
      video.pause();
      const preventAutoplay = () => {
        video.pause();
      };
      video.addEventListener('play', preventAutoplay);
      video.addEventListener('ended', preventAutoplay);
    }

    // Check if the user's primary device is a mouse (fine pointer) vs touch (coarse pointer)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches && videoRef.current && videoRef.current.duration) {
        // Reset to center frame on touch devices
        const center = videoRef.current.duration / 2;
        videoRef.current.currentTime = center;
        targetTimeRef.current = center;
        videoRef.current.pause();
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Respect reduced motion preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      return () => {
        finePointerQuery.removeEventListener('change', handlePointerChange);
      };
    }

    // Scroll listener: pause tracking when user scrolls past hero to save resources
    const handleScroll = () => {
      isHeroVisibleRef.current = window.scrollY < window.innerHeight * 1.25;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Seek trigger using requestAnimationFrame to prevent high-frequency seeking conflicts
    const requestSeek = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const vid = videoRef.current;
        if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

        // Ensure video is paused
        vid.pause();

        // Only seek if video is not currently decoding an in-flight seek
        if (!isSeekingRef.current && !vid.seeking) {
          const diff = Math.abs(vid.currentTime - targetTimeRef.current);
          if (diff > 0.015) {
            isSeekingRef.current = true;
            vid.currentTime = targetTimeRef.current;
          }
        }
      });
    };

    // Horizontal cursor movement (desktop fine pointer only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current || !isHeroVisibleRef.current) return;

      const vid = videoRef.current;
      if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

      // Baseline establishment: first pointer movement or re-entry after leave sets baseline
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      // Calculate timeline offset from horizontal cursor delta
      const duration = vid.duration;
      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * duration;

      // Move mouse left -> currentTime decreases (Camille looks left)
      // Move mouse right -> currentTime increases (Camille looks right)
      // Clamp to [0.08, duration - 0.08] so video never hits boundary black frames or ended state
      const newTarget = Math.max(0.08, Math.min(duration - 0.08, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      requestSeek();
    };

    const handleMouseLeave = () => {
      // Clear baseline so entering again from outside doesn't create a large delta jump
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.pause();
      // Start video strictly at center frame so Camille looks forward
      const centerTime = video.duration / 2;
      video.currentTime = centerTime;
      targetTimeRef.current = centerTime;
      video.pause();
      setIsLoaded(true);
    }
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (!isLoaded && video.duration) {
        const centerTime = video.duration / 2;
        video.currentTime = centerTime;
        targetTimeRef.current = centerTime;
        setIsLoaded(true);
      }
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.pause();

    // If rapid mouse movements updated targetTime during seek, jump straight to latest target
    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff > 0.02) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  return (
    <>
      {/* Fallback & Poster layer: centered on mobile, tailored on desktop */}
      <div
        id="hero-poster-fallback"
        className="fixed inset-0 z-0 w-full h-full bg-cover object-cover bg-center lg:bg-[position:68%_center] pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url(${POSTER_URL})`,
          opacity: isLoaded ? 0 : 1,
        }}
        aria-hidden="true"
      />

      {/* Interactive Hero Video Asset: /camille-hero.mp4 */}
      <video
        ref={videoRef}
        id="background-video"
        src={VIDEO_URL}
        poster={POSTER_URL}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onSeeked={handleSeeked}
        className={`fixed inset-0 z-0 w-full h-full object-cover object-center lg:object-[68%_center] pointer-events-none transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Subtle cinematic gradient vignette - ensures typography readability without obscuring character */}
      <div
        id="cinematic-vignette"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 35%, rgba(6, 6, 8, 0.45) 85%, rgba(6, 6, 8, 0.75) 100%), linear-gradient(to right, rgba(6, 6, 8, 0.75) 0%, rgba(6, 6, 8, 0.3) 42%, transparent 70%), linear-gradient(to bottom, rgba(6, 6, 8, 0.55) 0%, transparent 18%, transparent 82%, rgba(6, 6, 8, 0.75) 100%)',
        }}
      />
    </>
  );
};

