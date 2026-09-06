import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export const AboutCamille: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="profile"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#0b0909] text-[#f7f4ed] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div
          className={`flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-8 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
          <span>07 / PHILOSOPHY & BACKGROUND</span>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Editorial Statement */}
          <div
            className={`reveal-slide-left lg:col-span-7 ${
              isIntersecting ? 'is-revealed' : ''
            }`}
          >
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.08] tracking-tight text-[38px] sm:text-[50px] md:text-[62px] mb-8"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Code is only <span className="italic text-[#dfb8aa]">half the story</span>.
            </h2>

            <div className="space-y-6 text-[#c5beb4] text-[16px] sm:text-[17px] leading-relaxed font-light">
              <p>
                In an industry where engineering and aesthetics are often separated into distant silos, I operate fluidly between both. I write production-ready code with the sensibility of a graphic designer, and design visual systems with a pragmatic understanding of how browsers and state machines actually render.
              </p>
              <p>
                Every project begins with intent: finding the authentic character of the idea, establishing a distinctive typographic voice, and shaping layout tension that draws the eye naturally.
              </p>
              <p>
                Whether crafting contemporary e-commerce experiences like <span className="text-white font-normal underline decoration-[#dfb8aa]/60 underline-offset-4">Atlas</span>, building bespoke visual identity suites on Behance, or choreographing interactive digital touchpoints, my commitment is to make things that feel memorable, personal, and genuinely handcrafted.
              </p>
            </div>

            {/* Signature Accent */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              <div
                className="text-[32px] sm:text-[38px] text-[#dfb8aa] tracking-wide"
                style={{ fontFamily: "var(--font-signature), 'Pinyon Script', cursive" }}
              >
                Camille.
              </div>
              <div className="text-[12px] text-white/40 uppercase tracking-widest font-mono">
                CREATIVE DEVELOPER & DESIGNER
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details Matrix & Portfolio Evidence */}
          <div
            className={`reveal-slide-right lg:col-span-5 flex flex-col gap-6 ${
              isIntersecting ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Core Values Card */}
            <div className="bg-[#131111] border border-white/10 rounded-2xl p-7 sm:p-8">
              <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#dfb8aa] font-mono mb-6">
                Guiding Principles
              </h3>
              <ul className="space-y-4">
                {[
                  { title: 'Intention over Decoration', text: 'Every margin, color value, and transition curve serves a clear spatial purpose.' },
                  { title: 'Artisanal Code Quality', text: 'Clean TypeScript structures, accessible markup, and optimized bundle footprints.' },
                  { title: 'Typographic Primacy', text: 'High-contrast editorial serif paired with crisp modern display type creates timeless hierarchy.' },
                  { title: 'Feminine & Cinematic Mood', text: 'Sophisticated dark atmosphere with warm champagne notes and fluid micro-interactions.' },
                ].map((item, idx) => (
                  <li key={idx} className="border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                    <div className="text-[15px] text-[#f7f4ed] font-medium mb-1">
                      {item.title}
                    </div>
                    <div className="text-[13px] text-[#9b938d] font-light leading-relaxed">
                      {item.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Link Card */}
            <div className="bg-gradient-to-br from-[#181414] to-[#121010] border border-[#dfb8aa]/20 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#dfb8aa] font-mono mb-1">
                  PUBLIC WORK ARCHIVE
                </div>
                <div className="text-[16px] text-white font-medium">
                  Verified Behance Portfolio
                </div>
              </div>
              <a
                href="https://www.behance.net/cameliatimsili"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#dfb8aa] text-[#110f0f] flex items-center justify-center hover:bg-[#e8c4b8] transition-transform hover:scale-105"
                aria-label="Visit Camille Behance Profile"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
