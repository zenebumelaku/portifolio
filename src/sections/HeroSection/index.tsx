import { Github, Linkedin, ArrowDown } from "lucide-react";
import { HeroVisual } from "@/sections/HeroSection/components/HeroVisual";
import {
  defaultPortfolioSiteContent,
  type PortfolioSiteContent,
} from "@/data/site-content";

export const HeroSection = ({
  content = defaultPortfolioSiteContent.hero,
}: {
  content?: PortfolioSiteContent["hero"];
}) => {
  return (
    <section className="site-section soft-grid" id="home">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <div>
          <p className="mb-5 text-sm font-medium text-slate-500 dark:text-slate-300">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
            <span className="block">{content.headline}</span>
            <span className="mt-2 block text-indigo-600 dark:text-indigo-400">
              {content.accentText}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
            {content.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
            >
              {content.primaryCta}
              <ArrowDown size={16} />
            </a>
            <a
              href={content.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <Github size={16} /> {content.secondaryCta}
            </a>
            <a
              href={content.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500"
            >
              <Linkedin size={16} /> {content.tertiaryCta}
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
};
