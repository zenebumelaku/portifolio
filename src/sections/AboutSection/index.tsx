import { AboutHighlightCard } from "@/sections/AboutSection/components/AboutHighlightCard";

const icon = (label: string) =>
  `https://dummyimage.com/96x96/f5f5f5/111827&text=${encodeURIComponent(label)}`;

export const AboutSection = () => {
  return (
    <section id="about" className="site-section">
      <div className="section-inner">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div className="rounded-2xl border-2 border-black p-6 md:p-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Me
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-700">
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

          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <AboutHighlightCard
              iconSrc={icon("EDU")}
              title="Education"
              description="Software Engineering, Addis Ababa University - fourth-year student"
            />
            <AboutHighlightCard
              iconSrc={icon("WORK")}
              title="Work Focus"
              description="Full-Stack and Flutter Mobile Developer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
