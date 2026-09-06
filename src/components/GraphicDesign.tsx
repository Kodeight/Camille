import React from 'react';
import { graphicProjects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const GraphicDesign: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="graphic-design"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#070707] text-[#f7f4ed] pt-10 sm:pt-14 pb-10 sm:pb-14 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/[0.04] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className={`reveal-fade-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>03 / GRAPHIC DESIGN & IDENTITY</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Visual identities with something to say.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              Logotypes, tactile print suites, and comprehensive brand architectures sourced directly from real client and creative commissions.
            </p>
          </div>

          <div className={`text-right reveal-fade-right ${isIntersecting ? 'is-revealed' : ''}`}>
            <a
              href="https://www.behance.net/cameliatimsili"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-[#dfb8aa] hover:text-[#e8c4b8] underline underline-offset-4 tracking-wider uppercase font-light transition-colors"
            >
              <span>Explore Behance profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Symmetrical Uniform Height Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {graphicProjects.map((project, index) => {
            // Balanced mix of premium layout entry animations
            const animationTypes = ['reveal-fade-left', 'reveal-fade-up', 'reveal-fade-right'];
            const animClass = animationTypes[index % 3];

            // Same aspect ratio for perfect alignment across columns
            const aspectClass = 'aspect-[4/3]';
            const delayMs = (index % 3) * 120;

            return (
              <article
                key={project.id}
                className={`${animClass} group relative flex flex-col h-full bg-[#110f0f] rounded-2xl border border-white/10 overflow-hidden hover:border-[#dfb8aa]/40 transition-all duration-500 ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                {/* Project Media Container */}
                <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#161313]`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (project.fallbackImage) {
                        (e.target as HTMLImageElement).src = project.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110f0f] via-transparent to-black/25 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      {project.tag}
                    </span>
                  </div>

                  {/* Hover indicator link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-[#dfb8aa] group-hover:border-[#dfb8aa]/50 transition-all duration-300 group-hover:scale-110"
                    aria-label={`View ${project.title} on Behance`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Information Block - flex-1 and flex-col ensures uniform heights */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#dfb8aa] mb-2 font-mono">
                      <span>{project.category}</span>
                      <span className="text-white/40">{project.year}</span>
                    </div>

                    <h3
                      className="text-[#f7f4ed] text-[22px] sm:text-[25px] font-normal leading-snug tracking-tight transition-transform duration-300 group-hover:translate-x-1.5"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {project.title}
                    </h3>

                    {/* Subtle expanding accent line on hover */}
                    <div className="w-8 h-[1px] bg-[#dfb8aa]/40 my-3 transition-all duration-500 group-hover:w-20 group-hover:bg-[#dfb8aa]" />

                    <p className="text-[#9e9690] text-[13px] sm:text-[14px] leading-relaxed font-light line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Direct link */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-white/80 group-hover:text-[#dfb8aa] transition-colors font-light flex items-center gap-1.5"
                    >
                      <span>View on Behance</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] text-white/30 tracking-widest uppercase">
                      ID #{project.id.slice(-4)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
