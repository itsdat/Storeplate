"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// export interface DropdownItem {
//   label: string;
//   onClick?: () => void;
//   url?: string;
// }

export interface IPopupAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disable?: boolean;
  hidden?: boolean;
  url?: string;
  classNameItem?: string;
}

interface BaseDropdownProps {
  children: React.ReactNode; // Nút bấm / icon / avatar ...
  menuLabel?: string;
  items: IPopupAction[];
  align?: "start" | "center" | "end";
  className?: string;
}

export function BaseDropdown({
  children,
  menuLabel,
  items,
  align = "start",
  className,
}: BaseDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        className={`min-w-60 bg-(--color-card) border-0 z-10000 ${
          className || ""
        }`}
        align={align}
      >
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}

        <DropdownMenuGroup className="m-0">
          {items.map((item, index) => (
            <DropdownMenuItem
              hidden={item.hidden}
              disabled={item.disable}
              className={cn(
                `relative overflow-hidden group cursor-pointer rounded-s-sm py-2 text-md transition-all duration-200 hover:bg-(--color-border)! ${
                  item.danger
                    ? "text-red-500 hover:text-red-500!"
                    : "text-(--color-title)!"
                }`,
                item.classNameItem
              )}
              key={index}
              onClick={item.onClick}
            >
              {item.icon && item.icon} {item.label}
              {/* <span
                className={`absolute inset-0 scale-y-0 group-hover:scale-y-100 bg-(--color-dark-light) transition-transform duration-500 origin-top `}
              ></span> */}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
