import React, { useEffect, useState, useRef } from 'react';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const progressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let isWindowLoaded = document.readyState === 'complete';
    let isVideoReady = false;

    // Listen to window load event if not already complete
    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };
    if (!isWindowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    // Access the background video element
    const video = document.getElementById('background-video') as HTMLVideoElement | null;

    const checkVideoStatus = () => {
      if (video) {
        // readyState >= 3 means HAVE_FUTURE_DATA, readyState 4 means HAVE_ENOUGH_DATA
        if (video.readyState >= 3) {
          isVideoReady = true;
        }
      } else {
        // If there's no video tag on the DOM yet, count as ready to let flow continue
        isVideoReady = true;
      }
    };

    const handleVideoCanPlay = () => {
      isVideoReady = true;
    };

    if (video) {
      video.addEventListener('canplay', handleVideoCanPlay);
      video.addEventListener('canplaythrough', handleVideoCanPlay);
    }

    const startTime = Date.now();
    const minLoadingTime = 1300; // Minimum 1.3s duration for loading aesthetics
    const maxLoadingTime = 12000; // 12s fallback timeout to avoid blocking slow connections

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      checkVideoStatus();

      // Dynamic target progressive percentages
      let targetProgress = 15;

      if (isWindowLoaded) {
        targetProgress = 55;
      }

      if (isWindowLoaded && isVideoReady) {
        targetProgress = 100;
      }

      // Hold at 99% if minimum display duration is not met
      if (elapsed < minLoadingTime && targetProgress === 100) {
        targetProgress = 99;
      }

      // Fallback timeout override
      if (elapsed >= maxLoadingTime) {
        targetProgress = 100;
      }

      // Smoothly ease actual progress toward target
      const current = progressRef.current;
      const easeSpeed = targetProgress === 100 ? 0.08 : 0.04;
      const step = (targetProgress - current) * easeSpeed;

      if (Math.abs(step) > 0.05) {
        const next = Math.min(100, current + step);
        progressRef.current = next;
        setProgress(Math.floor(next));
      } else if (targetProgress === 100 && current < 100) {
        progressRef.current = 100;
        setProgress(100);
      }

      if (progressRef.current < 100) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Smoothly fade out the loader
        setFade(true);
        const timer = setTimeout(() => {
          onComplete();
        }, 750);
        return () => clearTimeout(timer);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      if (video) {
        video.removeEventListener('canplay', handleVideoCanPlay);
        video.removeEventListener('canplaythrough', handleVideoCanPlay);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] transition-all duration-700 ease-in-out ${
        fade ? 'opacity-0 pointer-events-none scale-105 filter blur-md' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 gap-6">
        {/* Signature Name */}
        <div
          className="text-[44px] sm:text-[52px] text-[#dfb8aa] tracking-wide select-none"
          style={{ fontFamily: "var(--font-signature), 'Pinyon Script', cursive" }}
        >
          Camille.
        </div>

        {/* Progress Counter & Track */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#dfb8aa]/85 font-mono font-light select-none">
            <span>LOADING CREATIONS</span>
            <span>{progress}%</span>
          </div>
          {/* Progress Track */}
          <div className="relative w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#dfb8aa] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
