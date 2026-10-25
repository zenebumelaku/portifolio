import type { ProjectCardProps } from "@/sections/ProjectsSection/components/ProjectCard";

export type PortfolioProject = ProjectCardProps & {
  id: string;
  published: boolean;
};

const defaultProjects: PortfolioProject[] = [
  {
    id: "zenebu-portfolio",
    published: true,
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
    id: "peachy-ecommerce",
    published: true,
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
    id: "rent-a-ride",
    published: true,
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
    live: "https://rent-ride-39el.vercel.app/",
    github: "https://github.com/zenebumelaku/Rent_ride",
  },
  {
    id: "api-health-checker",
    published: true,
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

const storageKey = "zenebu-portfolio-projects";

const isProject = (value: unknown): value is PortfolioProject => {
  if (typeof value !== "object" || value === null) return false;

  const project = value as Record<string, unknown>;
  return (
    typeof project.id === "string" &&
    typeof project.published === "boolean" &&
    (project.mediaType === "image" ||
      project.mediaType === "video" ||
      project.mediaType === "placeholder") &&
    typeof project.imageAlt === "string" &&
    typeof project.category === "string" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    Array.isArray(project.skills) &&
    project.skills.every((skill) => typeof skill === "string") &&
    (project.mediaSrc === undefined || typeof project.mediaSrc === "string") &&
    (project.live === undefined || typeof project.live === "string") &&
    (project.github === undefined || typeof project.github === "string") &&
    (project.screenshots === undefined ||
      (Array.isArray(project.screenshots) &&
        project.screenshots.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as Record<string, unknown>).src === "string" &&
            typeof (item as Record<string, unknown>).alt === "string",
        )))
  );
};

export const loadPortfolioProjects = (): {
  projects: PortfolioProject[];
  error?: string;
} => {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === null) return { projects: defaultProjects };

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isProject)) {
      return {
        projects: defaultProjects,
        error: "Saved project data is invalid. Showing the original projects.",
      };
    }

    return { projects: parsed };
  } catch {
    return {
      projects: defaultProjects,
      error: "Saved project data could not be read. Showing the original projects.",
    };
  }
};

export const savePortfolioProjects = (projects: PortfolioProject[]) => {
  window.localStorage.setItem(storageKey, JSON.stringify(projects));
};

export const createProjectId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}`;
};
