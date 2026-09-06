export interface WebProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Development';
  tags: string[];
  description: string;
  url: string;
  image: string;
  logoImage?: string;
  highlights: string[];
  featured: boolean;
  year: string;
  role: string;
}

export interface GraphicProject {
  id: string;
  title: string;
  category: 'Branding' | 'Graphic Design' | 'UI/UX';
  tag: string;
  image: string;
  fallbackImage: string;
  url: string;
  description: string;
  year: string;
  layoutSpan: 'large' | 'tall' | 'wide' | 'medium';
}

export type ProjectCategoryFilter = 'ALL' | 'WEB DEVELOPMENT' | 'GRAPHIC DESIGN' | 'UI/UX' | 'BRANDING';

export const webProjects: WebProject[] = [
  {
    id: 'atlas-clothing',
    title: 'Atlas',
    subtitle: 'Contemporary Fashion & Apparel E-Commerce',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'E-Commerce', 'Responsive Architecture'],
    description:
      "Official fashion e-commerce store for Atlas, featuring women's and men's contemporary collections, editorial edits, and streamlined payment on delivery across 69 wilayas in Algeria.",
    url: 'http://atlas-dz.vercel.app',
    image: '/projects/atlas/atlas-lookbook.jpg',
    logoImage: '/projects/atlas/atlas-logo.png',
    highlights: [
      'Engineered dynamic cart and localized delivery flow across 69 Algerian wilayas',
      'Editorial high-fashion lookbook aesthetic paired with instant responsiveness',
      'Optimized micro-interactions, swipeable collections, and quick cart drawers',
      'Production deployment with clean modular component architecture and high performance hosting',
    ],
    featured: true,
    year: '2026',
    role: 'Lead Frontend Developer & UI Designer',
  },
];

export const graphicProjects: GraphicProject[] = [
  {
    id: '235077041',
    title: 'Visual Identity System',
    category: 'Branding',
    tag: 'Identity & Brand Architecture',
    image: '/projects/visual-identity.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/939eac235077041.68d03b28eaffa.jpg',
    url: 'https://www.behance.net/gallery/235077041/Visual-identity',
    description:
      'Comprehensive brand identity framework, custom logotype balance, harmonious color psychology, and unified stationery collateral.',
    year: '2025',
    layoutSpan: 'large',
  },
  {
    id: '243554385',
    title: 'Logo & Brand Mark',
    category: 'Branding',
    tag: 'Logotype & Mark',
    image: '/projects/logo.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/2d1769243554385.6983cbbba49ac.jpg',
    url: 'https://www.behance.net/gallery/243554385/Logo',
    description:
      'Precision-crafted geometric mark exploring optical symmetry, negative space, and timeless typographic balance.',
    year: '2026',
    layoutSpan: 'medium',
  },
  {
    id: '235076987',
    title: 'Selected Design Series',
    category: 'Graphic Design',
    tag: 'Editorial & Posters',
    image: '/projects/my-designs.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/d1e2c6235076987.698523f025173.jpg',
    url: 'https://www.behance.net/gallery/235076987/My-Designs',
    description:
      'Explorative visual compositions balancing modern typography, spatial rhythm, and tactile color contrast.',
    year: '2025',
    layoutSpan: 'wide',
  },
  {
    id: '235076825',
    title: 'Perfection Brand Concept',
    category: 'UI/UX',
    tag: 'Art Direction & Presentation',
    image: '/projects/perfection.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/d2cb82235076825.68d03a0f90020.jpg',
    url: 'https://www.behance.net/gallery/235076825/Perfection-',
    description:
      'High-contrast conceptual branding and luxury product presentation with restrained minimalist aesthetics.',
    year: '2025',
    layoutSpan: 'medium',
  },
  {
    id: '234365531',
    title: 'Bespoke Invitation & Stationery',
    category: 'Graphic Design',
    tag: 'Print & Bespoke Craft',
    image: '/projects/wedding-card.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/529ad4234365531.68c1cbe7e18b7.jpg',
    url: 'https://www.behance.net/gallery/234365531/Wedding-card',
    description:
      'Delicate bespoke stationery design, organic botanical elements, and custom typographic callouts for private clientele.',
    year: '2025',
    layoutSpan: 'medium',
  },
  {
    id: '234365361',
    title: 'Minimalist Identity & Business Cards',
    category: 'Branding',
    tag: 'Corporate Identity Suite',
    image: '/projects/business-cards.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/701cec234365361.69852351e6c7f.jpg',
    url: 'https://www.behance.net/gallery/234365361/Business-cards',
    description:
      'Tactile business card identity system, foil deboss typography, and modern minimalist presentation.',
    year: '2025',
    layoutSpan: 'tall',
  },
  {
    id: '234364893',
    title: 'Social Media Campaigns & Posts',
    category: 'UI/UX',
    tag: 'Digital Experience & Social',
    image: '/projects/social-posts.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/afb297234364893.6985237935678.jpg',
    url: 'https://www.behance.net/gallery/234364893/posts',
    description:
      'High-impact visual narratives, modular promotional carousels, and grid storytelling for digital fashion brands.',
    year: '2025',
    layoutSpan: 'medium',
  },
  {
    id: '234364681',
    title: 'Automotive Flyer & Editorial',
    category: 'Graphic Design',
    tag: 'Editorial Print Media',
    image: '/projects/car-flyer.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/21b5a2234364681.68c99f3bb8bc1.jpg',
    url: 'https://www.behance.net/gallery/234364681/Car-flyer',
    description:
      'Dynamic automotive editorial layout synthesizing speed, precision spec matrices, and bold typography.',
    year: '2025',
    layoutSpan: 'tall',
  },
  {
    id: '234364401',
    title: 'Culinary Visual Identity & Menu',
    category: 'Branding',
    tag: 'Packaging & Hospitality',
    image: '/projects/food-design.jpg',
    fallbackImage: 'https://mir-s3-cdn-cf.behance.net/projects/808/2e0a87234364401.68c48c501a75f.jpg',
    url: 'https://www.behance.net/gallery/234364401/Food-design',
    description:
      'Gastronomic brand presentation, sensory color palette, handcrafted menu layout, and packaging details.',
    year: '2025',
    layoutSpan: 'wide',
  },
];

export interface ServiceItem {
  number: string;
  title: string;
  shortDescription: string;
  details: string[];
}

export const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'Web Development',
    shortDescription: 'Modern, performant web applications engineered with clean code, scalable architecture, and pixel-precision.',
    details: ['React & Next.js Ecosystems', 'TypeScript Architecture', 'High-Performance SPA & SSR', 'API & Headless Integration'],
  },
  {
    number: '02',
    title: 'UI / UX Design',
    shortDescription: 'Intuitive digital interfaces that solve complex user problems with elegance, clarity, and delight.',
    details: ['User Flow & Journey Mapping', 'Wireframing & Interactive Prototyping', 'Design Systems & Component Libraries', 'Mobile-First Experiences'],
  },
  {
    number: '03',
    title: 'Graphic Design',
    shortDescription: 'Compelling visual compositions, editorial layouts, and print assets crafted with intentional typography.',
    details: ['Editorial & Publication Design', 'Posters & Marketing Collateral', 'Digital & Social Content Systems', 'Art Direction & Moodboards'],
  },
  {
    number: '04',
    title: 'Brand Identity',
    shortDescription: 'Distinctive brand personalities translated into memorable logotypes, bespoke color systems, and guidelines.',
    details: ['Logo Suite & Mark Design', 'Visual Identity Systems', 'Comprehensive Brand Guidelines', 'Stationery & Packaging Design'],
  },
  {
    number: '05',
    title: 'Creative Direction',
    shortDescription: 'Holistic vision connecting narrative, aesthetics, and technology to establish unforgettable digital presence.',
    details: ['Conceptual Creative Strategy', 'Visual Identity Architecture', 'Lookbook & Content Direction', 'Brand Tone & Aesthetic Guardrails'],
  },
  {
    number: '06',
    title: 'Interactive Experiences',
    shortDescription: 'Immersive micro-interactions, responsive cursor mechanics, and cinematic motion that make websites memorable.',
    details: ['Bespoke Scroll & Reveal Choreography', 'Cursor & Micro-Interactions', 'Audio & Canvas Touches', 'Lightweight Fluid Animations'],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Listening before creating',
    description: 'Deeply understand the core idea, business goals, target audience, and emotional tone before touching any tool.',
  },
  {
    number: '02',
    title: 'Define',
    tagline: 'Clarity and strategic trajectory',
    description: 'Turn abstract concepts into a clear creative and technical roadmap, establishing scope, milestones, and aesthetic direction.',
  },
  {
    number: '03',
    title: 'Design',
    tagline: 'Forming the visual language',
    description: 'Craft high-fidelity interface layouts, design systems, typographic hierarchies, and micro-interaction states.',
  },
  {
    number: '04',
    title: 'Develop',
    tagline: 'Precision engineering',
    description: 'Translate approved designs into fast, accessible, responsive code utilizing React, TypeScript, and modern styling tools.',
  },
  {
    number: '05',
    title: 'Refine',
    tagline: 'Obsessing over the details',
    description: 'Polish typography, test responsive breakpoints across real devices, verify frame rates, and elevate transition ease.',
  },
  {
    number: '06',
    title: 'Launch',
    tagline: 'Shipping with confidence',
    description: 'Deploy to production environments, configure DNS and SEO metadata, verify cross-browser performance, and iterate.',
  },
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'DEVELOPMENT',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'JavaScript (ESNext)', 'HTML5 Semantic', 'CSS3 & Motion', 'REST APIs', 'Git & CI/CD'],
  },
  {
    category: 'DESIGN & IDENTITY',
    skills: ['UI / UX Architecture', 'Visual Identity', 'Typography Hierarchy', 'Graphic Design', 'Art Direction', 'Editorial Layout', 'Wireframing', 'Color Theory'],
  },
  {
    category: 'CRAFT & TOOLS',
    skills: ['Figma', 'Adobe Creative Suite', 'Responsive Engineering', 'Performance Optimization', 'Web Accessibility (WCAG)', 'Interactive Animation'],
  },
];

export const socialLinks = {
  behance: 'https://www.behance.net/cameliatimsili',
  webProject: 'http://atlas-dz.vercel.app',
  email: 'cameliatimsiline@gmail.com',
};
