export default function BaseHeading({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="w-full items-center justify-center flex flex-col">
      <h5 className="text-[40px] font-semibold text-(--color-title) leading-16">{title}</h5>
      {desc && <p className="text-(--color-text) text-lg">{desc}</p>}
    </div>
  );
}
