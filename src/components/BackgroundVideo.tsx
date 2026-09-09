import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';
// Sensitivity around 0.8 tuned for responsive, zero-delay follow
const SENSITIVITY = 0.82;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The video must remain strictly paused at all times
    video.pause();

    const enforcePause = () => {
      if (!video.paused) {
        video.pause();
      }
    };
    video.addEventListener('play', enforcePause);
    video.addEventListener('playing', enforcePause);

    // Center frame initialization
    const initCenterFrame = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        video.pause();
        const center = video.duration / 2;
        targetTimeRef.current = center;
        if (!video.seeking && !isSeekingRef.current) {
          isSeekingRef.current = true;
          video.currentTime = center;
        }
      }
    };

    if (video.readyState >= 1 && video.duration) {
      initCenterFrame();
    }
    video.addEventListener('loadedmetadata', initCenterFrame);
    video.addEventListener('canplay', initCenterFrame);

    // Fine hover check (Desktop cursor vs Mobile touch)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches && video.duration) {
        // Mobile behavior: centered frame, no cursor scrubbing, paused
        const center = video.duration / 2;
        targetTimeRef.current = center;
        video.currentTime = center;
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Controlled seek mechanism: executes a seek only if the video is not already seeking
    const performSeek = () => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // Prevent seek flooding: do NOT start another seek if one is in flight
      if (video.seeking || isSeekingRef.current) {
        return;
      }

      const target = targetTimeRef.current;
      // Skip redundant seek if already on this target
      if (Math.abs(video.currentTime - target) < 0.005) {
        return;
      }

      isSeekingRef.current = true;
      video.currentTime = target;
    };

    // When the current seek completes, immediately check if mouse moved to a new target
    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // Always prioritize the latest mouse position
      const target = targetTimeRef.current;
      if (Math.abs(video.currentTime - target) >= 0.005) {
        performSeek();
      }
    };
    video.addEventListener('seeked', handleSeeked);

    // Process latest target time efficiently via requestAnimationFrame
    const processFrame = () => {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        // Synchronize with native video.seeking if finished
        if (!video.seeking) {
          isSeekingRef.current = false;
        }

        if (!video.seeking && !isSeekingRef.current) {
          const target = targetTimeRef.current;
          if (Math.abs(video.currentTime - target) >= 0.005) {
            performSeek();
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(processFrame);
    };

    rafIdRef.current = requestAnimationFrame(processFrame);

    // Track horizontal mouse movement without triggering React re-renders
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const deltaX = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (deltaX === 0) return;

      const duration = video.duration;
      const viewportWidth = window.innerWidth || 1920;

      // Convert horizontal delta into video timeline offset based on viewport and duration
      const deltaOffset = (deltaX / viewportWidth) * duration * SENSITIVITY;

      // Clamp target time between 0 and duration
      const newTarget = Math.max(0, Math.min(duration, targetTimeRef.current + deltaOffset));
      targetTimeRef.current = newTarget;

      // Trigger immediate seek if video is idle
      performSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      prevXRef.current = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      video.removeEventListener('play', enforcePause);
      video.removeEventListener('playing', enforcePause);
      video.removeEventListener('loadedmetadata', initCenterFrame);
      video.removeEventListener('canplay', initCenterFrame);
      video.removeEventListener('seeked', handleSeeked);
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleInitCenterFrame = () => {
    const video = videoRef.current;
    if (video && video.duration && !Number.isNaN(video.duration)) {
      video.pause();
      const center = video.duration / 2;
      targetTimeRef.current = center;
      video.currentTime = center;
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

      {/* Interactive Hero Video - GPU composited, zero layout thrashing */}
      <video
        ref={videoRef}
        id="background-video"
        src={VIDEO_URL}
        poster={POSTER_URL}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={handleInitCenterFrame}
        onCanPlay={handleInitCenterFrame}
        className="absolute inset-0 w-full h-full object-cover [object-position:center_center] lg:[object-position:68%_center] pointer-events-none transform-gpu will-change-transform"
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
