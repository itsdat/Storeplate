import { ReactNode } from "react";

export default function BaseBadge({
  trigger,
  count = 0,
}: {
  trigger: ReactNode;
  count: number;
}) {
  return (
    <div className="relative inline-flex">
      {trigger}

      <span
        hidden={count === 0}
        className={`absolute -top-2 -right-2 flex h-4.5 min-w-4.5 aspect-square items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white cursor-pointer`}
      >
        {count && count > 9 ? `9+` : count}
      </span>
    </div>
  );
}
