import React, { useEffect, useRef } from 'react';

const VIDEO_URL = '/camille-hero.mp4';
const POSTER_URL = '/camille-hero-poster.jpg';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const lastAppliedTimeRef = useRef<number>(-1);
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef<boolean>(true);
  const hasInitializedCenterRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video must remain permanently paused
    video.pause();

    const enforcePause = () => {
      if (!video.paused) {
        video.pause();
      }
    };
    video.addEventListener('play', enforcePause);
    video.addEventListener('playing', enforcePause);

    // Initial center frame: execute ONCE only on initial metadata load
    const initCenterOnce = () => {
      if (hasInitializedCenterRef.current) return;
      if (video.duration && !Number.isNaN(video.duration)) {
        hasInitializedCenterRef.current = true;
        video.pause();
        const center = video.duration / 2;
        targetTimeRef.current = center;
        lastAppliedTimeRef.current = center;
        video.currentTime = center;
      }
    };

    if (video.readyState >= 1 && video.duration) {
      initCenterOnce();
    }
    video.addEventListener('loadedmetadata', initCenterOnce);

    // Fine pointer check for desktop mouse vs mobile touch
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

    // Core apply target logic: applies the latest coalesced target
    const applyTarget = () => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const now = performance.now();

      // Minimal recovery fallback: if 75ms has elapsed since the last seek dispatch,
      // or if native video.seeking is false, treat the seek as complete
      if (isSeekingRef.current) {
        if (!video.seeking || (now - lastSeekTimestampRef.current > 75)) {
          isSeekingRef.current = false;
        } else {
          return; // Browser still seeking current frame
        }
      }

      const target = targetTimeRef.current;
      // Avoid continuously writing identical timestamps (must differ by at least ~half a frame)
      if (Math.abs(target - lastAppliedTimeRef.current) >= 0.02) {
        isSeekingRef.current = true;
        lastSeekTimestampRef.current = now;
        lastAppliedTimeRef.current = target;
        video.currentTime = target;
      }
    };

    // When seeked fires, immediately clear seeking and apply latest target if cursor moved
    const handleSeeked = () => {
      isSeekingRef.current = false;
      applyTarget();
    };
    video.addEventListener('seeked', handleSeeked);

    // Single requestAnimationFrame scheduler
    const tick = () => {
      applyTarget();
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Mouse movement: calculates targetTime from horizontal cursor position
    // targetTime = (mouseX / window.innerWidth) * video.duration
    // Cursor is ALWAYS allowed to update targetTimeRef.current
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFinePointerRef.current) return;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const viewportWidth = window.innerWidth || 1920;
      const ratio = Math.max(0, Math.min(1, e.clientX / viewportWidth));
      const duration = video.duration;

      // Clamp target between 0.01 and duration - 0.01 (safe margin against edge/ended state)
      targetTimeRef.current = Math.max(0.01, Math.min(duration - 0.01, ratio * duration));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      video.removeEventListener('play', enforcePause);
      video.removeEventListener('playing', enforcePause);
      video.removeEventListener('loadedmetadata', initCenterOnce);
      video.removeEventListener('seeked', handleSeeked);
      finePointerQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

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
