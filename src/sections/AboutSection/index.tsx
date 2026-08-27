import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="site-section">
      <motion.div
        className="section-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div>
          <div className="p-6 md:p-8">
            <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
              About Me
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-700">
              <p>
                I&apos;m Zenebu Melaku, a fourth-year Software Engineering
                student at Addis Ababa University and a{" "}
                <strong className="font-semibold text-neutral-950">
                  Full-Stack and Mobile Developer
                </strong>{" "}
                who builds modern, scalable web and Flutter applications.
              </p>

              <p>
                I enjoy turning ideas into practical digital products, working
                across frontend, backend, APIs, databases, and system
                architecture. I&apos;m also learning{" "}
                <strong className="font-semibold text-neutral-950">
                  AI engineering
                </strong>
                , with a growing interest in machine learning, data, and
                intelligent applications.
              </p>

              <p>
                I&apos;m focused on continuous learning, building real-world
                projects, and becoming a versatile software engineer.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
