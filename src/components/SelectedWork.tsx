import React, { useState, useMemo } from 'react';
import { webProjects, graphicProjects, ProjectCategoryFilter } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

interface UnifiedProject {
  id: string;
  title: string;
  category: 'WEB DEVELOPMENT' | 'GRAPHIC DESIGN' | 'UI/UX' | 'BRANDING';
  displayCategory: string;
  tag: string;
  image: string;
  fallbackImage?: string;
  url: string;
  description: string;
  year: string;
  isWeb?: boolean;
}

const CATEGORIES: ProjectCategoryFilter[] = [
  'ALL',
  'WEB DEVELOPMENT',
  'GRAPHIC DESIGN',
  'UI/UX',
  'BRANDING',
];

export const SelectedWork: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>('ALL');
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  // Map both web projects and graphic projects into unified items
  const allProjects: UnifiedProject[] = useMemo(() => {
    const webItems: UnifiedProject[] = webProjects.map((p) => ({
      id: p.id,
      title: p.title,
      category: 'WEB DEVELOPMENT',
      displayCategory: 'Web Development & E-Commerce',
      tag: p.subtitle,
      image: p.image,
      url: p.url,
      description: p.description,
      year: p.year,
      isWeb: true,
    }));

    const graphicItems: UnifiedProject[] = graphicProjects.map((p) => {
      let mappedCategory: 'GRAPHIC DESIGN' | 'UI/UX' | 'BRANDING' = 'GRAPHIC DESIGN';
      if (p.category === 'Branding') mappedCategory = 'BRANDING';
      else if (p.category === 'UI/UX') mappedCategory = 'UI/UX';

      return {
        id: p.id,
        title: p.title,
        category: mappedCategory,
        displayCategory: p.category,
        tag: p.tag,
        image: p.image,
        fallbackImage: p.fallbackImage,
        url: p.url,
        description: p.description,
        year: p.year,
        isWeb: false,
      };
    });

    return [...webItems, ...graphicItems];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return allProjects;
    return allProjects.filter((p) => p.category === activeFilter);
  }, [allProjects, activeFilter]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 w-full max-w-full bg-[#070707] text-[#f7f4ed] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden"
    >
      <div id="work" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className={`reveal-slide-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>02 / PORTFOLIO</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Selected work.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              A collection of digital experiences, identities and interfaces created with intention.
            </p>
          </div>

          <div className={`text-right hidden md:block reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            <span className="text-[13px] text-white/40 tracking-wider font-mono">
              SHOWING {filteredProjects.length} OF {allProjects.length} PIECES
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div
          className={`reveal-fade-up w-full max-w-full flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 sm:mb-12 scrollbar-none ${
            isIntersecting ? 'is-revealed' : ''
          }`}
          style={{ transitionDelay: '120ms' }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#dfb8aa] text-[#0f0d0d] font-medium shadow-sm'
                    : 'bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            // Stagger delay based on index
            const delayMs = (index % 6) * 80;

            return (
              <article
                key={project.id}
                className={`reveal-fade-up group relative flex flex-col bg-[#0f0d0d] border border-white/10 rounded-2xl overflow-hidden hover:border-[#dfb8aa]/40 transition-all duration-500 hover:-translate-y-1.5 ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                {/* Project Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161313]">
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
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0d] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      {project.displayCategory}
                    </span>
                    {project.isWeb && (
                      <span className="text-[11px] uppercase tracking-wider text-[#dfb8aa] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#dfb8aa]/30">
                        LIVE APP
                      </span>
                    )}
                  </div>

                  {/* Year Tag */}
                  <span className="absolute top-4 right-4 text-[12px] text-white/60 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono">
                    {project.year}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[12px] text-[#dfb8aa] tracking-wide mb-1.5 font-light">
                      {project.tag}
                    </div>
                    <h3
                      className="text-[#f7f4ed] text-[22px] sm:text-[24px] font-normal leading-snug tracking-tight group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#9c948e] text-[13px] sm:text-[14px] leading-relaxed mt-2.5 line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] text-white/80 group-hover:text-[#dfb8aa] transition-colors font-medium cursor-pointer"
                      aria-label={`View ${project.title} on ${project.isWeb ? 'live site' : 'Behance'}`}
                    >
                      <span>{project.isWeb ? 'Visit live site' : 'View on Behance'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <span className="text-[11px] text-white/30 tracking-widest uppercase">
                      {project.isWeb ? 'VERCEL' : 'BEHANCE'}
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
