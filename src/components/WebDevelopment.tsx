import React, { useState } from 'react';
import { webProjects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const WebDevelopment: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  return (
    <section
      id="development"
      ref={ref}
      className="relative z-10 w-full bg-[#0c0a0a] text-[#f7f4ed] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>03 / WEB DEVELOPMENT</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Digital experiences built from the ground up.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              Frontend architecture marrying clean component systems with high-end editorial aesthetics and smooth interactivity.
            </p>
          </div>

          <div className="hidden lg:block text-right">
            <span className="text-[12px] uppercase tracking-widest text-[#dfb8aa]/80 bg-[#dfb8aa]/10 border border-[#dfb8aa]/20 px-3.5 py-1.5 rounded-full">
              PRODUCTION CASE STUDY
            </span>
          </div>
        </div>

        {/* Featured Web Projects Showcase */}
        <div className="space-y-20">
          {webProjects.map((project) => {
            const previewImages = [
              project.image,
              ...(project.lookbookImage ? [project.lookbookImage] : []),
            ];

            return (
              <div
                key={project.id}
                className="bg-[#121010] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 transition-all duration-700 hover:border-white/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  {/* Left Column: Project Overview & Specs */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Project Meta Bar */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[12px] uppercase tracking-wider text-[#dfb8aa] font-mono">
                          {project.year}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-[12px] text-white/70 tracking-wide font-light">
                          {project.role}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="flex items-baseline gap-4 mb-2">
                        <h3
                          className="text-[#fbf9f5] text-[38px] sm:text-[46px] font-normal leading-tight tracking-tight"
                          style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                          {project.title}
                        </h3>
                        <span className="text-[13px] uppercase tracking-widest text-emerald-400/90 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      </div>

                      <div className="text-[15px] text-[#dfb8aa] font-light mb-5">
                        {project.subtitle}
                      </div>

                      <p className="text-[#c2bab2] text-[15px] sm:text-[16px] leading-relaxed font-light mb-8">
                        {project.description}
                      </p>

                      {/* Technical Features Checklist */}
                      <div className="space-y-3 mb-8">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-mono">
                          Key Deliverables
                        </div>
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#dfb8aa] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mb-10">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-mono mb-3">
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tech) => (
                            <span
                              key={tech}
                              className="text-[12px] text-white/85 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#dfb8aa] text-[#110f0f] font-medium text-[14px] sm:text-[15px] px-7 py-3 rounded-full hover:bg-[#e8c4b8] transition-all duration-300 shadow-md group cursor-pointer"
                      >
                        <span>Visit live site</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/60 hover:text-white transition-colors underline underline-offset-4 hidden sm:inline-flex items-center gap-1"
                      >
                        <span>atlas-dz.vercel.app</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Browser Viewport Mockup */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
                      {/* Browser Window Bar */}
                      <div className="bg-[#1b1818] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="text-[11px] text-white/50 font-mono tracking-wide bg-black/40 px-4 py-1 rounded-md border border-white/5 truncate max-w-[240px] sm:max-w-xs">
                          https://atlas-dz.vercel.app
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                          <Sparkles className="w-3.5 h-3.5 text-[#dfb8aa]/80" />
                        </div>
                      </div>

                      {/* Main Showcase Image Frame */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181515]">
                        <img
                          src={previewImages[selectedImageIndex] || project.image}
                          alt={`${project.title} live interface preview`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />

                        {/* Hover Overlay Button to open site */}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        >
                          <span className="inline-flex items-center gap-2 bg-[#dfb8aa] text-[#110f0f] text-[13px] font-medium px-5 py-2.5 rounded-full shadow-lg">
                            <span>Open Atlas Live Website</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Image Selector Thumbnails (if multiple exist) */}
                    {previewImages.length > 1 && (
                      <div className="flex items-center gap-3 pt-2">
                        {previewImages.map((imgSrc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                              selectedImageIndex === idx
                                ? 'border-[#dfb8aa] scale-105 shadow-md'
                                : 'border-white/10 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={imgSrc} alt="Preview thumb" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        <span className="text-[11px] text-white/40 font-light ml-2">
                          Switch view
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
