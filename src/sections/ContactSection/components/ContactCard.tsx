type ContactCardProps = {
  href: string;
  iconSrc: string;
  title: string;
  value: string;
};

export const ContactCard = (props: ContactCardProps) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-xl border-2 border-slate-900 bg-white p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      <img
        src={props.iconSrc}
        alt=""
        className="h-10 w-10 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-950"
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {props.title}
        </p>
        <p className="truncate text-sm font-semibold text-slate-950 group-hover:underline dark:text-slate-50">
          {props.value}
        </p>
      </div>
    </a>
  );
};
