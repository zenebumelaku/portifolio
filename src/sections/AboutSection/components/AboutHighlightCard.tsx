type AboutHighlightCardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

export const AboutHighlightCard = (props: AboutHighlightCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-black bg-white/70 p-4">
      <img
        src={props.iconSrc}
        alt=""
        className="h-11 w-11 rounded-xl border border-neutral-200 bg-neutral-50 p-2 object-contain"
      />
      <div>
        <h3 className="text-lg font-semibold text-neutral-950">
          {props.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-neutral-600">
          {props.description}
        </p>
      </div>
    </div>
  );
};
