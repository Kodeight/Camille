import React, { useState } from 'react';
import { servicesList } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Plus, Minus } from 'lucide-react';

export const Services: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#0a0909] text-[#f7f4ed] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className={`reveal-slide-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>05 / CAPABILITIES & SERVICES</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              What I can build with you.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              End-to-end design and technical execution crafted to give your digital presence longevity and unmistakable character.
            </p>
          </div>

          <div className={`text-right hidden sm:block reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] text-[#dfb8aa] hover:text-white transition-colors underline underline-offset-4 tracking-wider uppercase font-light"
            >
              <span>Discuss a new commission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Services List Rows */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {servicesList.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const delayMs = index * 90;

            return (
              <div
                key={service.number}
                onClick={() => toggleExpand(index)}
                className={`reveal-fade-up group relative py-8 sm:py-10 transition-all duration-500 cursor-pointer hover:bg-white/[0.02] px-3 sm:px-6 rounded-xl ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{ transitionDelay: `${delayMs}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-[14px] sm:text-[16px] font-mono text-[#dfb8aa] transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <h3
                        className="text-[#f7f4ed] text-[26px] sm:text-[34px] md:text-[40px] font-normal tracking-tight transition-transform duration-300 group-hover:translate-x-2"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                      >
                        {service.title}
                      </h3>

                      {/* Expanding accent line */}
                      <div className="w-12 h-[1px] bg-[#dfb8aa]/40 mt-2 transition-all duration-500 group-hover:w-32 group-hover:bg-[#dfb8aa]" />
                    </div>
                  </div>

                  {/* Right: Short description & expand control */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 lg:max-w-md pt-2 lg:pt-0">
                    <p className="text-[#9e9690] text-[14px] sm:text-[15px] font-light leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/70 group-hover:text-white group-hover:border-white/40 transition-colors">
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Collapsible Details Drawer */}
                {isExpanded && (
                  <div className="pt-6 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 animate-fade-in">
                    {service.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="text-[12px] sm:text-[13px] text-white/80 bg-white/[0.04] border border-white/10 p-3 rounded-lg flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dfb8aa]" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
