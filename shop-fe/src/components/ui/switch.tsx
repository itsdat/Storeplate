"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-(--color-dark-light) border data-[state=unchecked]:bg-(--color-foreground) focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-(--color-background) inline-flex h-6 w-11 px-0.5 shrink-0 items-center rounded-full shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full shadow-sm ring-0 transition-all",
          "bg-(--color-background)",
          "peer-data-[state=checked]:bg-(--color-btn)!",
          "peer-data-[state=unchecked]:bg-(--color-background)",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:bg-(--color-btn)"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
