"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef, useState } from "react";
import { subscribeRouterRefresh } from "@/lib/routerRefresh";

export function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozenRef = useRef(context);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return subscribeRouterRefresh(() => {
      frozenRef.current = context; // 🔥 unfreeze
      forceUpdate((v) => v + 1);
    });
  }, [context]);

  return (
    <LayoutRouterContext.Provider value={frozenRef.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFilterRoute = pathname === "/products";

  const key = isFilterRoute
    ? pathname + "?" + searchParams.toString() // ❗ cho phép refresh
    : pathname; // ❄️ freeze các route khác

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
