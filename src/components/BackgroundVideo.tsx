import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';

// Video is 24fps (1 frame ≈ 0.0417s). Minimum delta to avoid redundant sub-frame seeks
const MIN_FRAME_DELTA = 0.035;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const lastRequestedTimeRef = useRef<number>(-1);
  const isSeekingRef = useRef<boolean>(false);
  const watchdogTimerRef = useRef<number | null>(null);
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

    // Watchdog management
    const clearWatchdog = () => {
      if (watchdogTimerRef.current !== null) {
        clearTimeout(watchdogTimerRef.current);
        watchdogTimerRef.current = null;
      }
    };

    // Center frame initialization
    const initCenter = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        video.pause();
        const center = video.duration / 2;
        targetTimeRef.current = center;
        lastRequestedTimeRef.current = center;
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
        lastRequestedTimeRef.current = center;
        video.currentTime = center;
      }
    };
    finePointerQuery.addEventListener('change', handlePointerChange);

    // Seek dispatcher: manages single active seek and watchdog
    const dispatchSeek = (target: number) => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      isSeekingRef.current = true;
      lastRequestedTimeRef.current = target;

      // Cancel/replace watchdog whenever a new seek starts
      clearWatchdog();
      watchdogTimerRef.current = window.setTimeout(() => {
        // Watchdog timeout fallback: recover from missed or stalled seeked events
        isSeekingRef.current = false;
        clearWatchdog();
        checkNextSeek();
      }, 120);

      video.currentTime = target;
    };

    // Evaluate whether a new seek should be issued based on coalesced latest target
    const checkNextSeek = () => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      // Rule 4: If video is currently seeking, DO NOT issue another seek
      if (isSeekingRef.current) return;

      const latestTarget = targetTimeRef.current;
      // Rule 9: Ignore tiny target changes that would produce visually identical frames
      if (Math.abs(latestTarget - lastRequestedTimeRef.current) >= MIN_FRAME_DELTA) {
        dispatchSeek(latestTarget);
      }
    };

    // When seeked fires:
    // 1. Immediately clear internal seeking lock and cancel watchdog
    // 2. Compare latest target with last requested target
    // 3. If meaningfully different, perform ONE new seek; otherwise do nothing
    const handleSeeked = () => {
      clearWatchdog();
      isSeekingRef.current = false;
      checkNextSeek();
    };
    video.addEventListener('seeked', handleSeeked);

    // ONE requestAnimationFrame scheduler: coalesces desired target and triggers seek only when idle
    const tick = () => {
      checkNextSeek();
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Mouse movement updates ONLY targetTimeRef.current
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const viewportWidth = window.innerWidth || 1920;
      const ratio = Math.max(0, Math.min(1, e.clientX / viewportWidth));
      const duration = video.duration;

      // Direct mapping across full horizontal viewport:
      // far left = 0.01s (beginning), center = duration / 2, far right = duration - 0.01s (end)
      const newTarget = Math.max(0.01, Math.min(duration - 0.01, ratio * duration));
      targetTimeRef.current = newTarget;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearWatchdog();
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
      lastRequestedTimeRef.current = center;
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
