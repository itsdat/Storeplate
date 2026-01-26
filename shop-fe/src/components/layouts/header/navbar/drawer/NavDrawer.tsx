import BaseDrawer from "@/components/common/drawer/BaseDrawer";
import { LogoIcon } from "@/components/common/icons/BaseIcon";
import ThemeToggle from "@/components/feature/theme/ThemeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  label: string;
  href?: string;
  children?: NavProps[];
}

const navItems: NavProps[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Carts", href: "/carts" },
  {
    label: "Pages",
    children: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "404 Page", href: "/not-found" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Profile", href: "/profile" },
  { label: "Login/Register", href: "/login" },
];

export default function NavDrawer({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const { theme } = useTheme();
  return (
    <BaseDrawer title={<LogoIcon />} open={open} onClose={onClose}>
      <ScrollArea className="h-screen overflow-y-auto mr-1">
        <div className="flex flex-col gap-10 lg:p-10 md:py-5 md:px-10 px-5">
          {navItems.map((item, index) => {
            if (item.href === "/login" && user) return null;
            if (item.href === "/profile" && !user) return null;
            const isActive = item.children?.some(
              (child) => child.href === pathname,
            );
            return (
              <div key={index}>
                {item.children ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={`${
                          isActive
                            ? "text-(--color-title)"
                            : "text-(--color-desc)"
                        } font-normal py-0 text-2xl hover:no-underline focus:ring-0!`}
                      >
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col ml-10 gap-5 pt-5">
                        {item.children.map((c, index) => (
                          <Link
                            key={index}
                            href={c.href ?? ""}
                            className={`${
                              pathname === c.href
                                ? "text-(--color-title) font-medium"
                                : "text-(--color-desc)"
                            } text-lg`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    hidden={
                      (user && item.href === "/login") ||
                      (!user && item.href === "/profile")
                    }
                    href={item.href ?? ""}
                    className={`${
                      pathname === item.href
                        ? "text-(--color-title)"
                        : "text-(--color-desc)"
                    } text-2xl`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="md:hidden px-5 py-5 flex items-center justify-start gap-3">
        <ThemeToggle />{" "}
        <p
          className={`capitalize ${theme === "dark" ? "font-thin" : "font-normal"}`}
        >
          {theme}
        </p>
      </div>
    </BaseDrawer>
  );
}
