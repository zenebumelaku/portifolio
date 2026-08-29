import { useMemo, useState } from "react";
import { ProjectCardProps } from "@/sections/ProjectsSection/components/ProjectCard";
import { ProjectFilter } from "@/sections/ProjectsSection/components/ProjectFilter";
import { ProjectGrid } from "@/sections/ProjectsSection/components/ProjectGrid";
import { motion } from "framer-motion";

const projects: ProjectCardProps[] = [
  {
    mediaType: "placeholder",
    imageAlt: "Zenebu portfolio website",
    category: "Web",
    title: "Zenebu Portfolio",
    description:
      "A modern developer portfolio showcasing full-stack, mobile, and AI-focused projects, skills, experience, and contact information.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    live: "https://zenivaworks.vercel.app/#skills",
  },
  {
    mediaType: "image",
    mediaSrc:
      "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/screens.png",
    imageAlt: "Peachy Ecommerce mobile app screens",
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/screens.png",
        alt: "Peachy Ecommerce app overview",
      },
      {
        src: "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/home.png",
        alt: "Peachy Ecommerce home screen",
      },
      {
        src: "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/detail_product.png",
        alt: "Peachy Ecommerce product details screen",
      },
      {
        src: "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/cart.png",
        alt: "Peachy Ecommerce cart screen",
      },
      {
        src: "https://raw.githubusercontent.com/zenebumelaku/firebase_ecommerce/main/screenshots/profile.png",
        alt: "Peachy Ecommerce profile screen",
      },
    ],
    category: "Mobile",
    title: "Peachy Ecommerce",
    description:
      "A functional Flutter ecommerce app powered by Firebase, with clean architecture, BLoC state management, product discovery, checkout, order tracking, and customer messaging.",
    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "Firestore",
      "BLoC",
      "Clean Architecture",
    ],
    github: "https://github.com/zenebumelaku/firebase_ecommerce",
  },
  {
    mediaType: "image",
    mediaSrc:
      "https://github.com/user-attachments/assets/4b769f7d-5d2c-43a7-8283-07fa8402de92",
    imageAlt: "Rent a Ride user booking interface",
    screenshots: [
      {
        src: "https://github.com/user-attachments/assets/4b769f7d-5d2c-43a7-8283-07fa8402de92",
        alt: "Rent a Ride user module",
      },
      {
        src: "https://github.com/user-attachments/assets/c08e3bf0-2776-4236-80b6-6714d52ec8d7",
        alt: "Rent a Ride admin module",
      },
      {
        src: "https://github.com/user-attachments/assets/59a9a9c7-5dc1-4f61-8d15-43266579386c",
        alt: "Rent a Ride vendor module",
      },
    ],
    category: "Full Stack",
    title: "Rent a Ride",
    description:
      "A full-stack car rental platform with user, admin, and vendor modules for browsing vehicles, managing listings, booking rides, and handling orders.",
    skills: [
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "JWT",
    ],
    github: "https://github.com/zenebumelaku/Rent_ride",
  },
  {
    mediaType: "placeholder",
    imageAlt: "API Health Checker service",
    category: "Backend",
    title: "API Health Checker",
    description:
      "A lightweight Express service that checks configured APIs in parallel and reports HTTP status, response time, errors, and timestamps.",
    skills: ["Node.js", "Express", "REST API", "Docker", "Postman"],
    github: "https://github.com/zenebumelaku/api_health_checker",
  },
];

export const ProjectsSection = () => {
  const [active, setActive] = useState("All");

  const visibleProjects = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
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
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Projects
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <ProjectFilter active={active} onChange={setActive} />
        </div>

        <div className="mt-8">
          {visibleProjects.length > 0 ? (
            <ProjectGrid projects={visibleProjects} />
          ) : (
            <div className="border-y border-neutral-200 py-12 text-neutral-500">
              <p className="text-lg font-medium text-neutral-900">
                Projects are on the way.
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6">
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
