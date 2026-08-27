type AboutHighlightCardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

export const AboutHighlightCard = (props: AboutHighlightCardProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border-2 border-black bg-white/70 p-3">
      <img
        src={props.iconSrc}
        alt=""
        className="h-9 w-9 shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 object-contain"
      />
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-neutral-950">
          {props.title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-neutral-600">
          {props.description}
        </p>
      </div>
    </div>
  );
};
