import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const lastAppliedTimeRef = useRef<number>(-1);
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekStartTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video must remain strictly paused at all times
    video.pause();

    const enforcePause = () => {
      if (!video.paused) {
        video.pause();
      }
    };
    video.addEventListener('play', enforcePause);
    video.addEventListener('playing', enforcePause);

    // Center frame initialization
    const initCenter = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        video.pause();
        const center = video.duration / 2;
        targetTimeRef.current = center;
        lastAppliedTimeRef.current = center;
        video.currentTime = center;
      }
    };

    if (video.readyState >= 1 && video.duration) {
      initCenter();
    }
    video.addEventListener('loadedmetadata', initCenter);
    video.addEventListener('canplay', initCenter);

    // Fine hover check (Desktop cursor vs Mobile touch)
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handlePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      if (!e.matches && video.duration) {
        const center = video.duration / 2;
        targetTimeRef.current = center;
        lastAppliedTimeRef.current = center;
        video.currentTime = center;
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Safe seek executor
    const performSeekToTarget = (target: number) => {
      isSeekingRef.current = true;
      lastSeekStartTimeRef.current = performance.now();
      lastAppliedTimeRef.current = target;
      video.currentTime = target;
    };

    // When seeked fires, CLEAR the seeking lock FIRST, then immediately check newest target
    const handleSeeked = () => {
      // 1. Clear seeking lock FIRST
      isSeekingRef.current = false;

      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // 2. Immediately check whether targetTimeRef has changed
      const target = targetTimeRef.current;
      if (Math.abs(target - lastAppliedTimeRef.current) >= 0.01) {
        performSeekToTarget(target);
      }
    };
    video.addEventListener('seeked', handleSeeked);

    // Main RAF loop: processes latest target with watchdog fallback
    const tick = () => {
      if (video && video.duration && !Number.isNaN(video.duration)) {
        const now = performance.now();

        // WATCHDOG FALLBACK:
        // If isSeekingRef is true, verify if a seek is genuinely stuck (>150ms)
        // or if the video element finished seeking. Never let the lock stay stuck.
        if (isSeekingRef.current) {
          if (!video.seeking || (now - lastSeekStartTimeRef.current > 150)) {
            isSeekingRef.current = false;
          }
        }

        // If not seeking, check if we need to apply the latest target
        if (!isSeekingRef.current) {
          const target = targetTimeRef.current;
          if (Math.abs(target - lastAppliedTimeRef.current) >= 0.01) {
            performSeekToTarget(target);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // Full horizontal viewport cursor mapping:
    // far LEFT -> beginning of video (0.01s safe clamp)
    // CENTER -> middle of video (duration / 2)
    // far RIGHT -> end of video (duration - 0.01s safe clamp)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const viewportWidth = window.innerWidth || 1920;
      const ratio = Math.max(0, Math.min(1, e.clientX / viewportWidth));
      const duration = video.duration;

      // Clamp between 0.01 and duration - 0.01 to prevent boundary black-outs
      const newTarget = Math.max(0.01, Math.min(duration - 0.01, ratio * duration));
      targetTimeRef.current = newTarget;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      video.removeEventListener('play', enforcePause);
      video.removeEventListener('playing', enforcePause);
      video.removeEventListener('loadedmetadata', initCenter);
      video.removeEventListener('canplay', initCenter);
      video.removeEventListener('seeked', handleSeeked);
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
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
      lastAppliedTimeRef.current = center;
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
