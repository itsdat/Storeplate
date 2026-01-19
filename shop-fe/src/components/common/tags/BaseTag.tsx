import { ReactNode } from "react";

export default function BaseTag({
  type = "outline",
  color = "#2196F3",
  children,
}: {
  type?: "outline" | "fill";
  color?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="w-fit px-3 rounded-full h-5 flex items-center justify-center gap-1"
      style={{ backgroundColor: `${color}1A` }}
    >
      <div
        className="w-1.5 h-1.5 aspect-square rounded-full"
        style={{ backgroundColor: `${color}` }}
      ></div>
      <p
        className={`text-[12px] uppercase font-semibold mt-0.5`}
        style={{ color: color }}
      >
        {children}
      </p>
    </div>
  );
}
