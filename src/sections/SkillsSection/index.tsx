import { SkillCategory } from "@/sections/SkillsSection/components/SkillCategory";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Flutter",
      "Dart",
    ],
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Socket.IO"],
  },
  {
    title: "Database & Backend-as-a-Service",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Mongoose", "Prisma"],
  },
  {
    title: "AI & Agentic Workflows",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Machine Learning",
      "Neural Networks",
      "LLMs",
      "AI Agents",
      "Generative AI",
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="site-section border-t border-neutral-100">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="eyebrow">Toolbox</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          My Skills
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {categories.map((category, index) => (
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
