import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-[#050505] text-[#f7f4ed] pt-14 pb-10 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-start">
          {/* Left Brand Identity */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[26px] sm:text-[30px] tracking-tight text-white font-normal"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Camille.
              </span>
              <span className="text-[#dfb8aa] text-[18px] leading-none" aria-hidden="true">
                ✳︎
              </span>
            </div>
            <p className="text-[#99918b] text-[14px] font-light max-w-xs leading-relaxed">
              Creative developer and graphic designer crafting intentional web experiences and visual identities.
            </p>
          </div>

          {/* Center Navigation Links */}
          <div className="md:col-span-5 flex flex-wrap gap-x-8 gap-y-3 text-[14px] font-light text-white/80">
            <a href="#home" className="hover:text-[#dfb8aa] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#dfb8aa] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[#dfb8aa] transition-colors">
              Projects
            </a>
            <a href="#development" className="hover:text-[#dfb8aa] transition-colors">
              Web Development
            </a>
            <a href="#graphic-design" className="hover:text-[#dfb8aa] transition-colors">
              Graphic Design
            </a>
            <a href="#services" className="hover:text-[#dfb8aa] transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-[#dfb8aa] transition-colors">
              Process
            </a>
            <a href="#contact" className="hover:text-[#dfb8aa] transition-colors">
              Contact
            </a>
          </div>

          {/* Right Social Archive */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between">
            <div className="space-y-2">
              <a
                href="https://www.behance.net/cameliatimsili"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-[#dfb8aa] transition-colors font-light"
              >
                <span>Behance Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div>
                <a
                  href="http://atlas-dz.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-[#dfb8aa] transition-colors font-light"
                >
                  <span>Atlas Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-widest text-[#dfb8aa] hover:text-white transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-white/40 font-light">
          <div>&copy; 2026 Camille. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb8aa]" />
            <span>Designed &amp; developed with intention.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
