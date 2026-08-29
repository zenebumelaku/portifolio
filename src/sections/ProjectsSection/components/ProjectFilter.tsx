type ProjectFilterProps = {
  active: string;
  onChange: (category: string) => void;
};

const categories = ["All", "Full Stack", "Mobile", "Backend"];

export const ProjectFilter = ({ active, onChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            active === category
              ? "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
