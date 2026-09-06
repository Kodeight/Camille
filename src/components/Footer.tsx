import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-[#070707] text-[#f7f4ed] pt-16 pb-10 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/[0.04]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* Core Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-12 border-b border-white/[0.04]">
          {/* LEFT: Logo & Identity */}
          <div className="flex flex-col gap-2">
            <div
              className="text-[32px] sm:text-[36px] text-[#dfb8aa] tracking-wide leading-none"
              style={{ fontFamily: "var(--font-signature), 'Pinyon Script', cursive" }}
            >
              Camille.
            </div>
            <p className="text-[#99918b] text-[13px] font-light max-w-xs leading-relaxed mt-1">
              Creative web development and brand identity design.
            </p>
          </div>

          {/* CENTER: Clean Navigation Directory */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] sm:text-[14px] font-light text-white/60">
            <a href="#home" className="hover:text-[#dfb8aa] transition-colors duration-300">
              Home
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <a href="#about" className="hover:text-[#dfb8aa] transition-colors duration-300">
              About
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <a href="#projects" className="hover:text-[#dfb8aa] transition-colors duration-300">
              Projects
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <a href="#services" className="hover:text-[#dfb8aa] transition-colors duration-300">
              Services
            </a>
            <span className="text-white/10 hidden sm:inline">•</span>
            <a href="#contact" className="hover:text-[#dfb8aa] transition-colors duration-300">
              Contact
            </a>
          </nav>

          {/* RIGHT: External Archive & Top Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] sm:text-[14px] text-white/60 font-light">
            <a
              href="https://www.behance.net/cameliatimsili"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#dfb8aa] transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>Behance Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="http://atlas-dz.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#dfb8aa] transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>Atlas Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-[#dfb8aa] transition-colors inline-flex items-center gap-1 group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* BOTTOM Row: Rights, Intention Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-white/30 font-light">
          <div>&copy; 2026 Camille. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb8aa]/60" />
            <span>Designed &amp; developed with intention.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
