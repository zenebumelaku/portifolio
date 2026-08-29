import { motion } from "framer-motion";

export const JourneySection = () => {
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
        <p className="eyebrow">The journey</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Building from the ground up.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <motion.div
            className="rounded-xl border-2 border-slate-900 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Now
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">
              Full-Stack Developer
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Creating complete digital products across interfaces, APIs,
              databases, and application architecture.
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl border-2 border-slate-900 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Grounding
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">
              Software Engineering Student
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Studying Software Engineering at Addis Ababa University as a
              third-year student.
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl border-2 border-slate-900 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Next
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-50">
              AI Engineer
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Growing toward intelligent systems through machine learning, data
              engineering, and AI experimentation.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
