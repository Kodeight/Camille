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
    // Check if the user's primary device is a mouse (fine pointer) vs touch (coarse pointer)
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Respect reduced motion preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      return () => {
        finePointerQuery.removeEventListener('change', handlePointerChange);
      };
    }

    // Scroll listener: pause tracking when user scrolls well past hero to save resources
    const handleScroll = () => {
      isHeroVisibleRef.current = window.scrollY < window.innerHeight * 1.25;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Seek trigger using requestAnimationFrame to prevent high-frequency seeking conflicts
    const requestSeek = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const video = videoRef.current;
        if (!video || !video.duration || Number.isNaN(video.duration)) return;

        // Only seek if video is not currently decoding an in-flight seek
        if (!isSeekingRef.current && !video.seeking) {
          const diff = Math.abs(video.currentTime - targetTimeRef.current);
          if (diff > 0.015) {
            isSeekingRef.current = true;
            video.currentTime = targetTimeRef.current;
          }
        }
      });
    };

    // Horizontal cursor movement (desktop fine pointer only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current || !isHeroVisibleRef.current) return;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // Baseline establishment: first pointer movement or re-entry after leave sets baseline
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      // Calculate timeline offset from horizontal cursor delta
      const duration = video.duration;
      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * duration;

      // Move mouse left -> currentTime decreases (looks left)
      // Move mouse right -> currentTime increases (looks right)
      const newTarget = Math.max(0.05, Math.min(duration - 0.05, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      requestSeek();
    };

    const handleMouseLeave = () => {
      // Clear baseline so entering again from outside doesn't create a large delta
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
      // Start video centered so Camille looks forward
      const centerTime = video.duration / 2;
      video.currentTime = centerTime;
      targetTimeRef.current = centerTime;
      setIsLoaded(true);
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // If rapid mouse movements updated targetTime during seek, jump straight to latest target
    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff > 0.02) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  return (
    <>
      {/* Fallback & Poster layer: ensures hero layout and visuals are immediate with zero blank screen */}
      <div
        id="hero-poster-fallback"
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url(${POSTER_URL})`,
          backgroundPosition: '68% center',
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
        onSeeked={handleSeeked}
        className={`fixed inset-0 z-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          objectPosition: '68% center',
        }}
        aria-hidden="true"
      />

      {/* Subtle cinematic gradient vignette - ensures typography readability without obscuring character */}
      <div
        id="cinematic-vignette"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 68% 45%, transparent 35%, rgba(6, 6, 8, 0.45) 85%, rgba(6, 6, 8, 0.75) 100%), linear-gradient(to right, rgba(6, 6, 8, 0.78) 0%, rgba(6, 6, 8, 0.35) 42%, transparent 70%), linear-gradient(to bottom, rgba(6, 6, 8, 0.55) 0%, transparent 18%, transparent 82%, rgba(6, 6, 8, 0.75) 100%)',
        }}
      />
    </>
  );
};

