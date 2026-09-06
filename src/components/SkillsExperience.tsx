import React from 'react';
import { skillsData } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const SkillsExperience: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#070707] text-[#f7f4ed] py-10 sm:py-14 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/[0.04] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className={`reveal-slide-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>08 / TOOLKIT & DISCIPLINES</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Skills & technical fluency.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              Tools, frameworks, and methodologies deployed across production codebases and client design systems.
            </p>
          </div>

          <div className={`text-white/40 text-[12px] font-mono tracking-widest hidden md:block reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            PRACTICED & VERIFIED
          </div>
        </div>

        {/* Editorial Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((group, groupIdx) => {
            const delayMs = groupIdx * 120;

            return (
              <div
                key={group.category}
                className={`reveal-fade-up bg-[#100e0e] border border-white/10 rounded-2xl p-8 hover:border-[#dfb8aa]/30 transition-all duration-500 ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                  <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#dfb8aa] font-mono">
                    {group.category}
                  </h3>
                  <span className="text-[11px] text-white/40 font-mono">
                    0{groupIdx + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[13px] sm:text-[14px] text-[#e3ded6] bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-full hover:bg-[#dfb8aa]/10 hover:border-[#dfb8aa]/40 hover:text-[#dfb8aa] transition-all duration-300 font-light"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
