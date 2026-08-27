type ProjectFilterProps = {
  active: string;
  onChange: (category: string) => void;
};

const categories = ["Full Stack", "Mobile", "Backend"];

export const ProjectFilter = ({ active, onChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            active === category
              ? "border-neutral-950 bg-neutral-950 text-white"
              : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
