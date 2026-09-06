import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('cameliatimsiline@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative z-[1] w-full min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 px-6 sm:px-10 md:px-14 lg:px-16 pointer-events-none overflow-hidden"
    >
      <div id="home" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      {/* Editorial Content Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT SIDE: Editorial Positioning, Headline, and Actions */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start pointer-events-auto animate-fade-in-up">
            {/* 1. Small Introduction Eyebrow Label */}
            <div
              id="eyebrow-label"
              className="flex items-center gap-3 mb-5 sm:mb-6 select-none"
            >
              <span className="w-7 sm:w-9 h-[1px] bg-[#dfb8aa]/75" aria-hidden="true" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-[#e8e4dc]/80 font-light">
                CREATIVE DEVELOPER &nbsp;×&nbsp; DESIGNER
              </span>
            </div>

            {/* 2. Large Editorial Headline */}
            <h1
              id="editorial-headline"
              className="text-[#fbf9f5] font-normal leading-[0.96] tracking-tight mb-5 sm:mb-6 select-none"
              style={{
                fontSize: 'clamp(48px, 6.2vw, 92px)',
                fontFamily: 'var(--font-editorial)',
              }}
            >
              <span className="block">Hi,</span>
              <span className="block italic font-normal text-[#f4efe8]">
                I'm Camille.
              </span>
            </h1>

            {/* 3. Supporting Copy */}
            <p
              id="supporting-copy"
              className="text-[#ded8cb]/85 text-[15px] sm:text-[16px] leading-relaxed font-light max-w-[420px] mb-7 sm:mb-8"
            >
              A developer who builds and a designer who creates beautiful experiences.
            </p>

            {/* 4. Interactive Action Pills */}
            <div
              id="action-pills"
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              {/* Primary CTA */}
              <a
                id="pill-view-work"
                href="#work"
                className="inline-flex items-center justify-center bg-[#f5ede3] text-[#111111] font-medium border border-[#f5ede3] rounded-full text-[13px] sm:text-[14px] px-6 py-2.5 hover:bg-white hover:border-white transition-all duration-300 shadow-sm group"
              >
                <span>View My Work</span>
                <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>

              {/* Secondary CTA: Pitch */}
              <a
                id="pill-pitch"
                href="#contact"
                className="inline-flex items-center justify-center bg-transparent text-white/90 border border-white/25 rounded-full text-[13px] sm:text-[14px] px-5 py-2.5 hover:border-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Pitch an idea
              </a>

              {/* Secondary CTA: Hello */}
              <a
                id="pill-hello"
                href="#contact"
                className="inline-flex items-center justify-center bg-transparent text-white/80 border border-white/20 rounded-full text-[13px] sm:text-[14px] px-4.5 py-2.5 hover:border-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Send a brief hello
              </a>

              {/* Email Copy Pill */}
              <button
                id="pill-reach-us"
                type="button"
                onClick={handleCopyEmail}
                title="Click to copy email address"
                className="inline-flex items-center justify-center text-white/85 bg-transparent border border-white/20 rounded-full text-[13px] sm:text-[14px] px-4.5 py-2.5 gap-2 hover:border-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span>
                  {copied ? (
                    <span className="text-[#dfb8aa] font-medium">Copied to clipboard!</span>
                  ) : (
                    <>
                      <span className="text-white/60">Email: </span>
                      <span className="underline underline-offset-2 decoration-white/40">
                        cameliatimsiline@gmail.com
                      </span>
                    </>
                  )}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block shrink-0 opacity-70"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="1"
                    width="7"
                    height="7.5"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                  <rect
                    x="1"
                    y="3.5"
                    width="7"
                    height="7.5"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile-Only Handwritten Signature (Positioned below actions to keep character visible) */}
            <div
              id="signature-mobile"
              className="lg:hidden flex flex-col items-start select-none mt-8 pt-4 text-[#dfb8aa] pointer-events-none"
              style={{
                fontFamily:
                  "var(--font-signature), 'Pinyon Script', 'Italianno', cursive",
              }}
            >
              <div className="text-[34px] sm:text-[40px] leading-[0.95] tracking-wide -rotate-1">
                Ideas <span className="text-[28px] sm:text-[32px] italic opacity-85">into</span> Real Experiences
              </div>
              <svg
                className="w-48 h-4 text-[#dfb8aa] opacity-75 mt-0.5"
                viewBox="0 0 200 20"
                fill="none"
              >
                <path
                  d="M2 12C45 4 110 3 195 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Desktop Right Column Spacer to allow character video to take center-right stage */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
        </div>
      </div>

      {/* FAR RIGHT: Handwritten Signature Statement (Desktop) */}
      <div
        id="signature-statement-desktop"
        className="hidden lg:flex flex-col items-start select-none absolute right-8 xl:right-16 2xl:right-24 top-[32%] xl:top-[34%] z-[2] pointer-events-none animate-fade-in"
        style={{
          fontFamily:
            "var(--font-signature), 'Pinyon Script', 'Italianno', 'Playfair Display', cursive",
          color: '#dfb8aa',
        }}
      >
        <div className="text-[46px] xl:text-[58px] 2xl:text-[68px] leading-[0.95] tracking-wide -rotate-2 drop-shadow-sm">
          <span className="block hover:translate-x-1 transition-transform duration-300">
            Ideas
          </span>
          <span className="block ml-6 xl:ml-8 text-[36px] xl:text-[46px] 2xl:text-[54px] opacity-90 italic">
            into
          </span>
          <span className="block ml-2 xl:ml-3">Real</span>
          <span className="block ml-6 xl:ml-8 text-[48px] xl:text-[60px] 2xl:text-[72px]">
            Experiences
          </span>
        </div>

        {/* Hand-drawn curved underline stroke */}
        <svg
          className="w-48 xl:w-60 2xl:w-72 h-6 text-[#dfb8aa] ml-5 mt-1 opacity-80"
          viewBox="0 0 240 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 16C48 6 125 4 235 15C190 20 120 21 75 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative Accents: Far Right Vertical Axis & Exploration Indicator */}
      <div
        id="decorative-axis"
        className="hidden xl:flex flex-col items-center gap-3 absolute right-8 bottom-12 pointer-events-none select-none text-white/40"
      >
        <span
          className="text-[9px] uppercase tracking-[0.3em] font-light"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-1.5 h-1.5 rounded-full border border-[#dfb8aa]/80" />
        <div className="w-[1px] h-20 bg-white/20" />
      </div>

      {/* Bottom Editorial Status Line */}
      <div
        id="hero-status-bar"
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] text-white/40 tracking-[0.22em] uppercase font-light border-t border-white/10 pt-4 mt-auto select-none pointer-events-auto"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block animate-pulse" />
          <span>CAMILLE &copy;2026</span>
        </div>
        <div className="hidden md:block text-white/30">
          40.7128&deg; N, 74.0060&deg; W
        </div>
        <a
          href="#about"
          className="group flex items-center gap-2 text-white/60 hover:text-[#dfb8aa] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3 h-3 text-[#dfb8aa] transition-transform group-hover:translate-y-0.5 animate-bounce" />
        </a>
      </div>

      {/* Bottom Atmospheric Gradient Transition to Section 01 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 bg-gradient-to-t from-[#0a0909] via-[#0a0909]/75 to-transparent pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </section>
  );
};
