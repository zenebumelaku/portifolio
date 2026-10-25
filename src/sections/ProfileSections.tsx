import { Award, BriefcaseBusiness, Quote, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioSiteContent } from "@/data/site-content";

type ProfileSectionsContent = Pick<
  PortfolioSiteContent,
  "experience" | "certifications" | "testimonials"
>;

const sectionMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const ExperienceSection = ({
  content,
}: {
  content: ProfileSectionsContent["experience"];
}) =>
  content.items.length > 0 ? (
    <section id="experience" className="site-section border-t border-slate-200 dark:border-slate-800">
      <motion.div className="section-inner" {...sectionMotion}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {content.items.map((item, index) => (
            <motion.article
              key={`${item.role}-${item.organization}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                  <BriefcaseBusiness size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-600 dark:text-indigo-300">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item.organization}
                    {item.location && ` · ${item.location}`}
                  </p>
                </div>
              </div>
              {item.description && (
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              )}
              {item.highlights.length > 0 && (
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={`${highlight}-${highlightIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  ) : null;

export const CertificationsSection = ({
  content,
}: {
  content: ProfileSectionsContent["certifications"];
}) => (
  <section id="certifications" className="site-section border-t border-slate-200 dark:border-slate-800">
    <motion.div className="section-inner" {...sectionMotion}>
      <p className="eyebrow">{content.eyebrow}</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
        {content.title}
      </h2>
      {content.items.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <motion.article
              key={`${item.name}-${item.issuer}-${index}`}
              className="flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              whileHover={{ y: -3 }}
            >
              <Award className="text-indigo-600 dark:text-indigo-300" size={25} />
              <h3 className="mt-5 text-lg font-bold leading-6 text-slate-900 dark:text-slate-50">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {item.issuer}
                {item.date && ` · ${item.date}`}
              </p>
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                >
                  View credential <ExternalLink size={15} />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      ) : (
        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Certificates and professional credentials will appear here.
        </p>
      )}
    </motion.div>
  </section>
);

export const TestimonialsSection = ({
  content,
}: {
  content: ProfileSectionsContent["testimonials"];
}) =>
  content.items.length > 0 ? (
    <section id="testimonials" className="site-section border-t border-slate-200 dark:border-slate-800">
      <motion.div className="section-inner" {...sectionMotion}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          {content.title}
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {content.items.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:p-8"
              whileHover={{ y: -3 }}
            >
              <Quote className="text-indigo-600 dark:text-indigo-300" size={26} />
              <blockquote className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {[item.role, item.organization].filter(Boolean).join(" · ")}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  ) : null;
