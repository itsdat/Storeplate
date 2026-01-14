import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: string;
  children?: React.ReactNode;
  width?: "1xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

export default function BaseModal({
  open,
  onClose,
  title,
  description,
  children,
  width = "1xl",
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        width={width}
        className="bg-(--color-background) border-(--color-border)"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
