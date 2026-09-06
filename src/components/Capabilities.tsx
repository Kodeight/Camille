import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Layers, Zap, Eye, ShieldCheck } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'High-Performance Delivery',
    description: 'Zero bloat architecture. Optimized images, minimal JavaScript weight, and sub-second load times engineered for real-world user engagement.',
    metric: '< 1.2s',
    metricLabel: 'Average First Contentful Paint',
  },
  {
    icon: Eye,
    title: 'Typographic & Spatial Nuance',
    description: 'Optical alignment, intentional margins, balanced negative space, and typographic hierarchies designed to make content effortlessly readable.',
    metric: '60fps',
    metricLabel: 'Smooth Interaction Target',
  },
  {
    icon: Layers,
    title: 'Full-Stack Fluidity',
    description: 'Seamless collaboration from raw design concepts in Figma to production deployment on modern hosting like Vercel with structured versioning.',
    metric: '100%',
    metricLabel: 'Component Modularity',
  },
  {
    icon: ShieldCheck,
    title: 'Accessibility & Cross-Device Rigor',
    description: 'WCAG contrast compliance, keyboard navigation focus rings, reduced-motion fallbacks, and rigorous testing across desktop and mobile screens.',
    metric: 'WCAG AA',
    metricLabel: 'Design Standard Target',
  },
];

export const Capabilities: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative z-10 w-full bg-[#0a0808] text-[#f7f4ed] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className={`reveal-slide-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>09 / CAPABILITIES & RIGOR</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[36px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Standards of craft.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light max-w-xl mt-3">
              Guaranteed technical benchmarks and creative rigor applied to every digital project shipped.
            </p>
          </div>

          <div className={`text-white/40 text-[12px] font-mono tracking-widest hidden md:block reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            VERIFIED CRAFTSMANSHIP
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((item, idx) => {
            const Icon = item.icon;
            const delayMs = idx * 90;

            return (
              <div
                key={item.title}
                className={`reveal-fade-up bg-[#121010] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#dfb8aa]/30 transition-all duration-500 hover:-translate-y-1 ${
                  isIntersecting ? 'is-revealed' : ''
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#dfb8aa] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3
                    className="text-[#f7f4ed] text-[20px] font-normal tracking-tight mb-2.5"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[#99918b] text-[13px] sm:text-[14px] leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[20px] sm:text-[22px] font-mono text-[#dfb8aa]">
                    {item.metric}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40 font-light">
                    {item.metricLabel}
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
