"use client";
import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/header/navbar/Navbar";
import { PageTransition } from "@/providers/PageTransition";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <>{children}</>;
}

export default function LayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <ThemeWrapper>
        <PageTransition>
          {pathname.includes("/admin") || pathname.includes("/verify") ? (
            children
          ) : (
            <div>
              <Navbar />
              {children}
              <Footer />
            </div>
          )}
        </PageTransition>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
