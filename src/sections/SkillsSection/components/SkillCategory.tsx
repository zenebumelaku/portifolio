type SkillCategoryProps = {
  title: string;
  skills: string[];
};

export const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  return (
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
