import { useMemo, useState } from "react";
import { ProjectFilter } from "@/sections/ProjectsSection/components/ProjectFilter";
import { ProjectGrid } from "@/sections/ProjectsSection/components/ProjectGrid";
import { motion } from "framer-motion";
import { loadPortfolioProjects } from "@/data/projects";

export const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [projects] = useState(() => loadPortfolioProjects().projects);
  const publishedProjects = projects.filter((project) => project.published);
  const categories = [
    "All",
    ...new Set([
      "Full Stack",
      "Mobile",
      "Backend",
      ...publishedProjects.map((project) => project.category),
    ]),
  ];

  const visibleProjects = useMemo(
    () =>
      active === "All"
        ? publishedProjects
        : publishedProjects.filter((project) => project.category === active),
    [active, projects],
  );

  return (
    <section id="projects" className="site-section border-t border-neutral-100">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Projects
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <ProjectFilter
            active={active}
            categories={categories}
            onChange={setActive}
          />
        </div>

        <div className="mt-8">
          {visibleProjects.length > 0 ? (
            <ProjectGrid projects={visibleProjects} />
          ) : (
            <div className="border-y border-neutral-200 py-12 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <p className="text-lg font-medium text-slate-900 dark:text-slate-50">
                Projects are on the way.
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                This space will showcase Zenebu&apos;s real work. No placeholder
                projects are listed.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
