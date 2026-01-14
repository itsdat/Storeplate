import { LogoIcon } from "@/components/common/icons/BaseIcon";
import { Separator } from "@/components/ui/separator";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: <Facebook size={18} />, href: "https://facebook.com/" },
  { icon: <Twitter size={18} />, href: "https://github.com/" },
  { icon: <Github size={18} />, href: "https://x.com/" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/" },
];

export default function Footer() {
  return (
    <div className="w-full bg-(--color-foreground) mt-32">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-16">
          <Link href={"/"}>
            <LogoIcon />
          </Link>
          <div className="flex items-center justify-center gap-7">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-(--color-text) font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            {socials.map((item, index) => (
              <Link
                target="blank"
                href={item.href}
                key={index}
                className="w-10 aspect-square rounded-full bg-(--color-background) border border-(--color-border) flex items-center justify-center text-(--color-desc) hover:bg-(--color-btn) hover:text-(--color-text-btn) transition-all duration-300 cursor-pointer"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-(--color-border)" />

        <div className="w-full flex items-center justify-between py-5">
          <div className="flex items-center justify-start gap-5 w-full">
            <Link
              href={"/privacy-&-policy"}
              className="text-(--color-desc) font-medium"
            >
              Privacy & Policy
            </Link>
            <Link
              href={"/terms-of-service"}
              className="text-(--color-desc) font-medium"
            >
              Terms of Service
            </Link>
          </div>

          <p className="text-(--color-text) font-medium">itsdat@2026</p>
        </div>
      </div>
    </div>
  );
}
