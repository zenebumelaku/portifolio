import { motion } from "framer-motion";
import {
  defaultPortfolioSiteContent,
  type PortfolioSiteContent,
} from "@/data/site-content";

const renderParagraph = (paragraph: string) =>
  paragraph.split(/(\*\*.+?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-slate-900 dark:text-slate-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );

export const AboutSection = ({
  content = defaultPortfolioSiteContent.about,
}: {
  content?: PortfolioSiteContent["about"];
}) => {
  return (
    <section id="about" className="site-section">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div>
          <div className="p-6 md:p-8">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-6xl">
              {content.heading}
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
              {content.paragraphs.map((paragraph, index) => (
                <p key={`${content.heading}-${index}`}>
                  {renderParagraph(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
