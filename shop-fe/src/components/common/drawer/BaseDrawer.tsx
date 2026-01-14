import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface BaseDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: string;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export default function BaseDrawer({
  open,
  onClose,
  title,
  description,
  children,
  side = "left",
}: BaseDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side={side}
        className="w-100 sm:w-135 bg-(--color-background) border-none"
      >
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
}
