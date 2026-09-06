import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SectionIntro: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 w-full bg-[#0a0909] text-[#f7f4ed] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Subtle Section Index & Marker */}
        <div
          className={`flex items-center justify-between text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-[#dfb8aa]/90 font-light mb-12 sm:mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#dfb8aa]/70" />
            <span>01 / ABOUT CAMILLE</span>
          </div>
          <span className="text-white/30 hidden sm:inline">SCROLLING THROUGH IDEAS</span>
        </div>

        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-150 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.08] tracking-tight text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              I build digital experiences where <span className="italic text-[#dfb8aa]">code meets creativity</span>.
            </h2>
          </div>

          <div
            className={`lg:col-span-4 flex flex-col justify-between pt-2 lg:pt-4 transition-all duration-1000 delay-300 ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[#c8c1b8] text-[15px] sm:text-[16px] leading-relaxed font-light mb-6">
              Working at the confluence of engineering and visual design, I craft intentional web applications, bespoke brand identities, and memorable interfaces that resonate visually while performing effortlessly under the hood.
            </p>

            {/* Disciplines pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {['Web Development', 'UI / UX', 'Graphic Design', 'Branding', 'Digital Experiences'].map((discipline, idx) => (
                <span
                  key={discipline}
                  className="text-[12px] text-white/70 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ transitionDelay: `${400 + idx * 80}ms` }}
                >
                  {discipline}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-16 sm:mt-24" />
      </div>
    </section>
  );
};
