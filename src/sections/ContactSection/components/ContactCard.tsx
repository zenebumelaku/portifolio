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
      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-400 hover:bg-neutral-50"
    >
      <img
        src={props.iconSrc}
        alt=""
        className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 p-2"
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{props.title}</p>
        <p className="truncate text-sm font-semibold text-neutral-950 group-hover:underline">{props.value}</p>
      </div>
    </a>
  );
};