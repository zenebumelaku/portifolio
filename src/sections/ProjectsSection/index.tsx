import { useEffect, useMemo, useState } from "react";
import { ProjectFilter } from "@/sections/ProjectsSection/components/ProjectFilter";
import { ProjectGrid } from "@/sections/ProjectsSection/components/ProjectGrid";
import { motion } from "framer-motion";
import { defaultProjects, loadPublicProjects, type PortfolioProject } from "@/data/projects";
import { supabaseConfigured } from "@/data/supabase-config";

export const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<PortfolioProject[]>(
    supabaseConfigured ? [] : defaultProjects,
  );
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPublicProjects()
      .then(setProjects)
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Projects could not be loaded.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

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
    [active, publishedProjects],
  );

  return (
    <section id="projects" className="site-section border-t border-neutral-100">
      <motion.div className="section-inner">
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
          {error ? (
            <p role="alert" className="border-y border-red-200 py-6 text-sm text-red-700">
              Projects could not be loaded: {error}
            </p>
          ) : loading ? (
            <p role="status" className="py-8 text-sm text-slate-500">
              Loading projects…
            </p>
          ) : visibleProjects.length > 0 ? (
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
