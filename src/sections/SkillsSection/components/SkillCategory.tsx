type SkillCategoryProps = {
  title: string;
  skills: string[];
};

export const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  return (
    <div className="rounded-2xl border-2 border-black bg-white p-6">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-neutral-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
