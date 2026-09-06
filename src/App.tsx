import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionIntro } from './components/SectionIntro';
import { SelectedWork } from './components/SelectedWork';
import { WebDevelopment } from './components/WebDevelopment';
import { GraphicDesign } from './components/GraphicDesign';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { AboutCamille } from './components/AboutCamille';
import { SkillsExperience } from './components/SkillsExperience';
import { Capabilities } from './components/Capabilities';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#070707] text-[#f7f4ed] selection:bg-[#dfb8aa] selection:text-[#0f0d0d]">
      {/* Fixed Navbar with brand 'Camille.' and smooth scroll interactions */}
      <Navbar />

      {/* Main Hero Section (Preserved interactive 3D video scrubbing) */}
      <Hero />

      {/* Editorial Content Sections (Layered cleanly over background on scroll) */}
      <main className="relative z-10 w-full max-w-full overflow-x-clip flex flex-col gap-y-16">
        <SectionIntro />
        <SelectedWork />
        <WebDevelopment />
        <GraphicDesign />
        <Services />
        <Process />
        <AboutCamille />
        <SkillsExperience />
        <Capabilities />
        <ContactForm />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
