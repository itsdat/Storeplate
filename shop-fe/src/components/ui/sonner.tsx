"use client";

import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// Helper component cho Icon để code gọn hơn
const IconWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div
    className={`flex h-8 w-8 items-center justify-center rounded-lg ${className}`}
  >
    {children}
  </div>
);


const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      offset={100}
      toastOptions={{
        // Tùy chỉnh class cho từng loại toast để đẹp hơn
        classNames: {
          toast:
            "group backdrop-blur-md border bg-white/90 dark:bg-zinc-900/90 shadow-xl rounded-xl p-4 flex gap-3 items-start transition-all duration-300",
          title: "font-semibold text-sm text-zinc-900 dark:text-zinc-100",
          description:
            "text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed",
          actionButton:
            "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 font-medium",
          cancelButton:
            "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-medium",
        },
      }}
      icons={{
        success: (
          <IconWrapper className="flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={18} strokeWidth={3} />
          </IconWrapper>
        ),
        warning: (
          <IconWrapper className="flex items-center justify-center pb-0.5 pl-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <AlertTriangle size={18} strokeWidth={3} />
          </IconWrapper>
        ),
        error: (
          <IconWrapper className="flex items-center justify-center pl-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
            <XCircle size={18} strokeWidth={2.5} />
          </IconWrapper>
        ),
        info: (
          <div className="-left-10!"></div>
        ),
      }}
      style={
        {
          "--normal-bg": "var(--color-card)",
          "--normal-text": "var(--color-title)",
          "--normal-border": "var(--color-border)",
          "--border-radius": "var(--custom-radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
