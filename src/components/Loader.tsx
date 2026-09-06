import React, { useEffect, useState } from 'react';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds loader

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setFade(true);
        setTimeout(() => {
          onComplete();
        }, 700); // Complete smooth exit
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] transition-all duration-700 ease-in-out ${
        fade ? 'opacity-0 pointer-events-none scale-105 filter blur-sm' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 gap-6">
        {/* Signature Name */}
        <div
          className="text-[44px] sm:text-[52px] text-[#dfb8aa] tracking-wide"
          style={{ fontFamily: "var(--font-signature), 'Pinyon Script', cursive" }}
        >
          Camille.
        </div>

        {/* Progress Counter & Track */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#dfb8aa]/80 font-mono font-light">
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
