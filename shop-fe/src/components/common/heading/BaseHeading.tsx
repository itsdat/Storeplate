export default function BaseHeading({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="w-full items-center justify-center flex flex-col text-center">
      <h5 className="md:text-[40px] text-2xl font-semibold text-(--color-title) md:leading-16">{title}</h5>
      {desc && <p className="text-(--color-text) text-lg">{desc}</p>}
    </div>
  );
}
