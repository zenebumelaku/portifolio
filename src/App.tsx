import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/sections/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ContactSection } from "@/sections/ContactSection";
import { JourneySection } from "@/sections/JourneySection";
import { Footer } from "@/sections/Footer";
import { usePortfolioSiteContent } from "@/data/site-content";

const AdminDashboard = lazy(() =>
  import("@/admin/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);

const PortfolioSite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const content = usePortfolioSiteContent();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
        />
        <main>
          <HeroSection content={content.hero} />
          <AboutSection content={content.about} />
          <JourneySection content={content.journey} />
          <SkillsSection content={content.skills} />
          <ProjectsSection />
          <ContactSection content={content.contact} />
        </main>
        <Footer content={content.footer} />
      </div>
    </div>
  );
};

export const App = () =>
  window.location.pathname.startsWith("/admin") ? (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] text-sm text-slate-500">
          Loading admin workspace…
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  ) : (
    <PortfolioSite />
  );

export default App;
