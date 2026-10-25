import { motion } from "framer-motion";
import {
  defaultPortfolioSiteContent,
  type PortfolioSiteContent,
} from "@/data/site-content";

export const JourneySection = ({
  content = defaultPortfolioSiteContent.journey,
}: {
  content?: PortfolioSiteContent["journey"];
}) => {
  return (
    <section
      id="journey"
      className="site-section border-t border-slate-200 dark:border-slate-800"
    >
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          {content.title}
        </h2>
        <ol className="relative mt-10 space-y-8 before:absolute before:bottom-4 before:left-[7px] before:top-3 before:w-px before:bg-slate-200 dark:before:bg-slate-700">
          {content.items.map((item, index) => (
            <motion.li
              key={`${item.title}-${index}`}
              className="relative pl-9"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-indigo-600 bg-white dark:border-indigo-400 dark:bg-slate-950" />
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
                  {item.period}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </article>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
};
