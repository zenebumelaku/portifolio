type AboutHighlightCardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

export const AboutHighlightCard = (props: AboutHighlightCardProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border-2 border-slate-900 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/70">
      <img
        src={props.iconSrc}
        alt=""
        className="h-9 w-9 shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 object-contain dark:border-slate-700 dark:bg-slate-950"
      />
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          {props.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {props.description}
        </p>
      </div>
    </div>
  );
};
