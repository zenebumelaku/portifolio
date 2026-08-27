import { Navbar } from "@/sections/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ContactSection } from "@/sections/ContactSection";
import { JourneySection } from "@/sections/JourneySection";
import { Footer } from "@/sections/Footer";

export const App = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <div className="relative">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <JourneySection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
