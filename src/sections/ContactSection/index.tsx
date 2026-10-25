import { MapPin } from "lucide-react";
import { ContactCard } from "@/sections/ContactSection/components/ContactCard";
import { ContactForm } from "@/sections/ContactSection/components/ContactForm";
import { motion } from "framer-motion";
import {
  defaultPortfolioSiteContent,
  type PortfolioSiteContent,
} from "@/data/site-content";

const icon = (name: string) =>
  `https://dummyimage.com/96x96/f5f5f5/111827&text=${encodeURIComponent(name)}`;

export const ContactSection = ({
  content = defaultPortfolioSiteContent.contact,
}: {
  content?: PortfolioSiteContent["contact"];
}) => {
  return (
    <section
      id="contact"
      className="site-section border-t border-slate-200 dark:border-slate-800"
    >
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="mb-12 text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.cards.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <ContactCard
                  href={card.href}
                  iconSrc={icon(card.iconLabel)}
                  title={card.title}
                  value={card.value}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-4 rounded-xl border-2 border-slate-900 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {content.locationLabel}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {content.locationValue}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
