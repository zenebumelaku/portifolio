import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export type ProjectCardProps = {
  mediaType: "image" | "video" | "placeholder";
  mediaSrc?: string;
  imageAlt: string;
  screenshots?: { src: string; alt: string }[];
  category: string;
  description: string;
  title: string;
  skills: string[];
  live?: string;
  github?: string;
};

export const ProjectCard = (props: ProjectCardProps) => {
  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border-2 border-black bg-white transition hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {props.mediaType === "image" && props.mediaSrc ? (
          <img
            src={props.mediaSrc}
            alt={props.imageAlt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : props.mediaType === "video" && props.mediaSrc ? (
          <video
            src={props.mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-end bg-[radial-gradient(circle_at_70%_25%,rgba(17,24,39,.18),transparent_35%),linear-gradient(135deg,#f3f4f6,#e5e7eb)] p-5">
            <div className="w-full rounded-xl border border-neutral-200 bg-white/75 p-4 backdrop-blur">
              <p className="text-sm font-bold text-neutral-900">
                {props.title}
              </p>
              <div className="mt-3 h-2 w-3/4 rounded-full bg-neutral-200" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-neutral-200" />
            </div>
          </div>
        )}
      </div>

      {props.screenshots && props.screenshots.length > 0 && (
        <div className="flex gap-2 overflow-x-auto border-b border-neutral-100 bg-neutral-50 p-3">
          {props.screenshots.map((screenshot) => (
            <img
              key={screenshot.src}
              src={screenshot.src}
              alt={screenshot.alt}
              className="h-16 w-24 shrink-0 rounded-md border border-neutral-200 object-cover"
            />
          ))}
        </div>
      )}

      <div className="p-5 md:p-6">
        <span className="text-xs font-semibold uppercase tracking-[.15em] text-neutral-500">
          {props.category}
        </span>
        <h3 className="mt-2 text-xl font-bold tracking-tight">{props.title}</h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-neutral-600">
          {props.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {props.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          {props.live && (
            <a
              href={props.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
          {props.github && (
            <a
              href={props.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold hover:border-neutral-400"
            >
              <Github size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
