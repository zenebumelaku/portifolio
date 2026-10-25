import { ProjectCard } from "@/sections/ProjectsSection/components/ProjectCard";
import type { ProjectCardProps } from "@/sections/ProjectsSection/components/ProjectCard";

type ProjectGridProps = {
  projects: ProjectCardProps[];
};

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="grid gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
};