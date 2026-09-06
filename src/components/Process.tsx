import React from 'react';
import { processSteps } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Process: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#070707] text-[#f7f4ed] py-10 sm:py-14 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/[0.04] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className={`reveal-fade-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>05 / METHODOLOGY</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              How I work.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              A transparent, iterative sequence bridging strategic thinking, artisanal design, and robust frontend engineering.
            </p>
          </div>

          <div className={`text-white/40 text-[12px] font-mono tracking-widest hidden md:block reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            STEP-BY-STEP ITERATION
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const delayMs = index * 100;

            return (
              <div
                key={step.number}
                className={`reveal-fade-up group relative bg-[#110f0f] border border-white/10 rounded-2xl p-8 hover:border-[#dfb8aa]/40 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <span className="text-[18px] sm:text-[20px] font-mono text-[#dfb8aa] font-medium">
                      {step.number}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                      PHASE 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    className="text-[#f7f4ed] text-[24px] sm:text-[28px] font-normal leading-snug tracking-tight mb-2 group-hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {step.title}
                  </h3>

                  <div className="text-[13px] text-[#dfb8aa] font-light mb-4 italic">
                    {step.tagline}
                  </div>

                  <p className="text-[#9e9690] text-[14px] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Bottom decorative timeline indicator */}
                <div className="pt-8 mt-6 border-t border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#dfb8aa]/60 group-hover:bg-[#dfb8aa] transition-colors" />
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-[#dfb8aa]/30 transition-colors" />
                  <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                    STAGE {index + 1}/6
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
