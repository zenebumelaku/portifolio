import { Github, Linkedin, ArrowDown } from "lucide-react";
import { AnimatedHeroTitle } from "@/sections/HeroSection/components/AnimatedHeroTitle";
import { HeroVisual } from "@/sections/HeroSection/components/HeroVisual";

export const HeroSection = () => {
  return (
    <section className="site-section soft-grid" id="home">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div>
          <p className="mb-5 text-sm font-medium text-slate-500 dark:text-slate-300">
            FULL-STACK DEVELOPER
          </p>
          <AnimatedHeroTitle />
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            I build simple, useful web applications from front to back.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
            >
              Explore projects
              <ArrowDown size={16} />
            </a>
            <a
              href="https://github.com/zenebumelaku"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
};
