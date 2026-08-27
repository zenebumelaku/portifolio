import { Github, Linkedin, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedHeroTitle } from "@/sections/HeroSection/components/AnimatedHeroTitle";
import { HeroVisual } from "@/sections/HeroSection/components/HeroVisual";

export const HeroSection = () => {
  return (
    <section
      className="site-section soft-grid overflow-hidden bg-[#f7f7f2]"
      id="home"
    >
      <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for thoughtful builds
          </div>
          <p className="mb-5 text-sm font-medium text-neutral-500">
            FULL-STACK DEVELOPER
          </p>
          <AnimatedHeroTitle />
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            I build simple, useful web applications from front to back.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Explore projects
              <ArrowDown size={16} />
            </a>
            <a
              href="https://github.com/zenebumelaku"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold hover:border-neutral-400"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zenebu-melaku-7b9331225/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold hover:border-neutral-400"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            React · Node.js · Flutter · AI
          </p>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
};
