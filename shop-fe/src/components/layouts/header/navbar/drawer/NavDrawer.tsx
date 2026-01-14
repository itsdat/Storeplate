import BaseDrawer from "@/components/common/drawer/BaseDrawer";
import { LogoIcon } from "@/components/common/icons/BaseIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  {
    label: "Pages",
    children: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "404 Page", href: "/not-found" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function NavDrawer({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  return (
    <BaseDrawer title={<LogoIcon />} open={open} onClose={onClose}>
      <div className="flex flex-col gap-10 p-10">
        {navItems.map((item, index) => {
          const isActive = item.children?.some(
            (child) => child.href === pathname
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
    </BaseDrawer>
  );
}
