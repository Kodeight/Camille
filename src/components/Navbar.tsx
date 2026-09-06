import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 w-full z-50 px-6 sm:px-10 md:px-14 lg:px-16 flex justify-between items-center transition-all duration-500 entrance-nav ${
          scrolled
            ? 'py-4 sm:py-4.5 bg-[#070606]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-6 sm:py-7 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo (left) */}
        <a
          id="brand-logo"
          href="#home"
          className="flex items-center select-none group cursor-pointer"
          aria-label="Camille - Back to top"
        >
          <span
            className={`text-[#dfb8aa] tracking-wide font-normal transition-all duration-300 ${
              scrolled ? 'text-[25px] sm:text-[27px]' : 'text-[27px] sm:text-[29px]'
            }`}
            style={{ fontFamily: "var(--font-signature), 'Pinyon Script', cursive" }}
          >
            Camille.
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] font-light tracking-wide text-white/85"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#dfb8aa] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            id="desktop-cta"
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-light text-[#dfb8aa] hover:text-white underline underline-offset-4 decoration-[#dfb8aa]/40 hover:decoration-white transition-all duration-200 cursor-pointer"
          >
            <span>Let's talk</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          id="mobile-hamburger-btn"
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] cursor-pointer z-50 focus:outline-none p-1"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-overlay"
        className={`fixed inset-0 z-40 bg-[#070606]/98 backdrop-blur-2xl flex flex-col justify-between px-10 py-24 md:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#dfb8aa] mb-8 font-light flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#dfb8aa]" />
            <span>Navigation</span>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[32px] font-normal text-white hover:text-[#dfb8aa] transition-colors"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  transitionDelay: `${mobileMenuOpen ? idx * 60 : 0}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Mobile Action & Email */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-[12px] uppercase tracking-wider text-white/40 font-mono mb-2">
            Let's work together
          </div>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[17px] sm:text-[20px] font-light text-[#dfb8aa] hover:underline underline-offset-4 block mb-1 break-all"
          >
            cameliatimsiline@gmail.com
          </a>
          <div className="text-[12px] text-white/40 font-light">
            Creative Developer &times; Graphic Designer
          </div>
        </div>
      </div>
    </>
  );
};
