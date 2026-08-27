export const JourneySection = () => {
  return (
    <section id="journey" className="site-section border-t border-neutral-100">
      <div className="section-inner">
        <p className="eyebrow">The journey</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Building from the ground up.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="border-l-2 border-neutral-950 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Now
            </p>
            <h3 className="mt-3 text-xl font-bold">Full-Stack Developer</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Creating complete digital products across interfaces, APIs,
              databases, and application architecture.
            </p>
          </div>
          <div className="border-l-2 border-neutral-300 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Grounding
            </p>
            <h3 className="mt-3 text-xl font-bold">
              Software Engineering Student
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Studying Software Engineering at Addis Ababa University as a
              third-year student.
            </p>
          </div>
          <div className="border-l-2 border-neutral-300 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Next
            </p>
            <h3 className="mt-3 text-xl font-bold">AI Engineer</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Growing toward intelligent systems through machine learning, data
              engineering, and AI experimentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
