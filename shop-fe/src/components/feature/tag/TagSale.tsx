import TagIMG from "../../../../public/images/details/tag.png";

const toPercent = (value: number): number => {
  return Math.floor(value);
};

export default function TagSale({ value }: { value: number }) {
  return (
    <div className="relative inline-block">
      <img
        src={TagIMG.src}
        alt="Sale tag"
        className="w-17 -rotate-90"
      />
      <p className="absolute inset-0 flex ml-3 items-center justify-center text-white font-medium">
        {toPercent(value)}%
      </p>
    </div>
  );
}