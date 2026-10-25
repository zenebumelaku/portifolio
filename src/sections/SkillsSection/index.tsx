import { SkillCategory } from "@/sections/SkillsSection/components/SkillCategory";
import { motion } from "framer-motion";
import {
  defaultPortfolioSiteContent,
  type PortfolioSiteContent,
} from "@/data/site-content";

export const SkillsSection = ({
  content = defaultPortfolioSiteContent.skills,
}: {
  content?: PortfolioSiteContent["skills"];
}) => {
  return (
    <section id="skills" className="site-section border-t border-neutral-100">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {content.title}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <SkillCategory {...category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
