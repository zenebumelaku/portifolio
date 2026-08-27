import { AboutHighlightCard } from "@/sections/AboutSection/components/AboutHighlightCard";

const icon = (label: string) =>
  `https://dummyimage.com/96x96/f5f5f5/111827&text=${encodeURIComponent(label)}`;

export const AboutSection = () => {
  return (
    <section id="about" className="site-section">
      <div className="section-inner">
        <div className="grid gap-6">
          <div className="p-6 md:p-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Me
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-700">
              <p>
                I&apos;m Zenebu Melaku, a{" "}
                <strong className="font-bold text-neutral-950">
                  fourth-year Software Engineering student
                </strong>{" "}
                at Addis Ababa University and a{" "}
                <strong className="font-semibold text-neutral-950">
                  Full-Stack and Mobile Developer
                </strong>{" "}
                who builds{" "}
                <strong className="font-bold text-neutral-950">
                  modern, scalable web and Flutter applications
                </strong>
                .
              </p>

              <p>
                I enjoy turning ideas into{" "}
                <strong className="font-bold text-neutral-950">
                  practical digital products
                </strong>
                , working across frontend, backend, APIs, databases, and system
                architecture. I&apos;m also learning{" "}
                <strong className="font-semibold text-neutral-950">
                  AI engineering
                </strong>
                , with a growing interest in{" "}
                <strong className="font-bold text-neutral-950">
                  machine learning, data, and intelligent applications
                </strong>
                .
              </p>

              <p>
                I&apos;m focused on{" "}
                <strong className="font-bold text-neutral-950">
                  continuous learning
                </strong>
                , building{" "}
                <strong className="font-bold text-neutral-950">
                  real-world projects
                </strong>
                , and becoming a{" "}
                <strong className="font-bold text-neutral-950">
                  versatile software engineer
                </strong>
                .
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
