"use client";
import { Menu, ShoppingCart, UserRound } from "lucide-react";
import { LogoIcon } from "@/components/common/icons/BaseIcon";
import { Kbd } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../../../feature/theme/ThemeToggle";
import Link from "next/link";
import NavDrawer from "./drawer/NavDrawer";
import UserCart from "./cart/UserCart";
import { useSession } from "@/context/SessionProvider";
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import BaseBadge from "@/components/common/badge/BaseBadge";

export default function Navbar() {
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCmdK = isMac && e.metaKey && e.key.toLowerCase() === "k";
      const isCtrlK = !isMac && e.ctrlKey && e.key.toLowerCase() === "k";

      if (isCmdK || isCtrlK) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <div
      className={`w-full flex flex-col transition-all duration-300 items-center justify-center bg-(--color-background) sticky top-0 z-10 ${
        scrolled ? "shadow-sm h-24" : "h-28"
      }`}
    >
      <div className="w-full mx-auto max-w-7xl h-16 flex items-center justify-between  gap-4">
        <Link href={"/"} className="w-fit">
          <LogoIcon />
        </Link>

        <div
          onClick={() => setOpenMenu(true)}
          className="flex items-end cursor-pointer justify-center w-fit px-10 gap-1.5 text-sm"
        >
          <p>Pages</p>
          <Menu size={16} />
        </div>

        <div className="flex-1">
          <InputGroup className="py-2! h-11! border-(--color-dark-light) px-2 shadow-none bg-(--color-foreground) rounded-full">
            <InputGroupInput
              ref={inputRef}
              placeholder="Search for products"
              className="text-(--color-title)"
            />
            <InputGroupAddon align="inline-end">
              <Kbd className="bg-(--color-dark-light) text-(--color-text) pt-0.5">
                ⌘
              </Kbd>
              <Kbd className="bg-(--color-dark-light) text-(--color-text)">
                K
              </Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="w-fit pl-3 flex items-end justify-end gap-5">
          <ThemeToggle />
          <BaseBadge
            trigger={
              <UserCart
                onSetCount={(count) => setCount(count)}
                open={openCart}
                trigger={
                  <button
                    className="cursor-pointer"
                    onClick={() => setOpenCart(!openCart)}
                  >
                    <ShoppingCart strokeWidth={1.5} size={20} />
                  </button>
                }
              />
            }
            count={count}
          />
          {session?.userId ? (
            <Link href={"/profile"} className="cursor-pointer">
              <BaseAvatar name={session?.username} />
            </Link>
          ) : (
            <Link href={"/login"} className="cursor-pointer">
              <UserRound strokeWidth={1.5} size={20} />
            </Link>
          )}
        </div>
      </div>

      <NavDrawer open={openMenu} onClose={() => setOpenMenu(false)} />
    </div>
  );
}
