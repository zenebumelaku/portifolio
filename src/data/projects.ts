import type { ProjectCardProps } from "@/sections/ProjectsSection/components/ProjectCard";
import { supabaseConfigured } from "@/data/supabase-config";

export type PortfolioProject = ProjectCardProps & {
  id: string;
  published: boolean;
};

export const defaultProjects: PortfolioProject[] = [
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

type ProjectRow = {
  id: string;
  published: boolean;
  project: unknown;
  sort_order: number;
};

const fromRow = (row: ProjectRow): PortfolioProject | null => {
  if (
    typeof row.id !== "string" ||
    typeof row.published !== "boolean" ||
    typeof row.sort_order !== "number" ||
    typeof row.project !== "object" ||
    row.project === null
  ) {
    return null;
  }

  const project = { ...row.project, id: row.id, published: row.published };
  return isProject(project) ? project : null;
};

export const loadPublicProjects = async (): Promise<PortfolioProject[]> => {
  if (!supabaseConfigured) return defaultProjects;
  const { supabase } = await import("@/data/supabase");
  if (!supabase) return defaultProjects;

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("id, published, project, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  const projects = (data as ProjectRow[]).map(fromRow);
  if (projects.some((project) => project === null)) {
    throw new Error("A saved project has invalid data.");
  }

  return projects as PortfolioProject[];
};

export const loadAdminProjects = async (): Promise<PortfolioProject[]> => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("id, published, project, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  const projects = (data as ProjectRow[]).map(fromRow);
  if (projects.some((project) => project === null)) {
    throw new Error("A saved project has invalid data.");
  }

  return projects as PortfolioProject[];
};

export const savePortfolioProject = async (
  project: PortfolioProject,
  sortOrder: number,
) => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const { id, published, ...content } = project;
  const { error } = await supabase.from("portfolio_projects").upsert({
    id,
    published,
    project: content,
    sort_order: sortOrder,
  });

  if (error) throw error;
};

export const uploadProjectMedia = async (file: File, projectId: string) => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
    "video/mp4",
    "video/webm",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Choose a JPEG, PNG, WebP, GIF, AVIF, MP4, or WebM file.");
  }
  const sizeLimit = file.type.startsWith("video/") ? 50 : 10;
  if (file.size > sizeLimit * 1024 * 1024) {
    throw new Error(`Project media must be ${sizeLimit} MB or smaller.`);
  }

  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const safeProjectId = projectId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const objectPath = `${safeProjectId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("portfolio-project-media")
    .upload(objectPath, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) throw error;
  return supabase.storage.from("portfolio-project-media").getPublicUrl(objectPath)
    .data.publicUrl;
};

export const deletePortfolioProject = async (id: string) => {
  const { supabase } = await import("@/data/supabase");
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const createProjectId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}`;
};
