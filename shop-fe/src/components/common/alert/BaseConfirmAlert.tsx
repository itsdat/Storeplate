import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
export default function BaseConfirmAlert({
  open,
  onOpenChange,
  title = "Are you sure you want to take this action?",
  description = "If confirmed, the action will be taken and cannot be undone!",
  cancelText = "Cancel",
  confirmText = "Yes, I Agree",
  onConfirm,
  trigger,
}: {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-(--color-card) border-0 shadow-lg">
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="text-(--color-title)">
              {title}
            </AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription className="text-(--color-text)">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer bg-(--color-card) text-(--color-text) border border-(--color-dark-light) hover:bg-(--color-card) hover:text-(--color-text) hover:opacity-80">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-(--color-primary) hover:bg-(--color-primary) hover:opacity-80"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
