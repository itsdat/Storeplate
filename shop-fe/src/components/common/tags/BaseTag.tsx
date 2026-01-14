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
      className="w-fit px-3 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}E6` }}
    >
      <p className={`text-[13px] capitalize`} style={{ color: "#FFF" }}>
        {children}
      </p>
    </div>
  );
}
