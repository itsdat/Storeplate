"use client";
import {
  Menu,
  Search,
  SearchX,
  SendHorizontal,
  ShoppingCart,
  UserRound,
} from "lucide-react";
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
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import BaseBadge from "@/components/common/badge/BaseBadge";
import BaseModal from "@/components/common/modal/BaseModal";
import { getImageLink } from "@/utils/getImageLink.utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import BaseInput from "@/components/common/input/BaseInput";

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSearchMB, setOpenSearchMB] = useState<boolean>(false);
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

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
        setOpenSearch(true);
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", keyword);

    router.push(`/products?${params.toString()}`);
    setOpenSearchMB(false);
  };

  return (
    <>
      <div
        className={`w-full flex flex-col transition-all duration-300 items-center justify-center bg-(--color-background) sticky top-0 z-10 ${
          scrolled ? "shadow-sm md:h-24 h-12" : "md:h-28 h-14"
        }`}
      >
        <div className="w-full mx-auto max-w-7xl h-16 flex items-center justify-between lg:gap-4 md:gap-0 lg:px-0 md:px-5 px-3">
          <Link href={"/"} className="w-fit">
            <LogoIcon />
          </Link>

          <div className="flex items-center justify-end gap-2">
            <div
              onClick={() => setOpenSearchMB(!openSearchMB)}
              className="flex md:hidden items-end cursor-pointer justify-center w-fit lg:px-10 md:px-5 px-0 gap-1.5 text-sm"
            >
              {openSearchMB ? (
                <SearchX className="size-7 stroke-1" />
              ) : (
                <Search className="size-7 stroke-1" />
              )}
            </div>

            <div
              onClick={() => setOpenMenu(true)}
              className="flex items-end cursor-pointer justify-center w-fit lg:px-10 md:px-5 px-0 gap-1.5 text-sm"
            >
              <p className="hidden md:block">Pages</p>
              <Menu className="md:size-4 size-8 md:stroke-2 stroke-1" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 hidden md:block">
            <InputGroup className="py-2! h-11! border-(--color-dark-light) px-2 shadow-none bg-(--color-foreground) rounded-full">
              <InputGroupInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
          </form>

          <div className="w-fit pl-3 items-end justify-end gap-5 hidden md:flex">
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
            {user?.id ? (
              <Link href={"/profile"} className="cursor-pointer">
                <BaseAvatar
                  url={getImageLink(user?.avatar ?? "")}
                  name={`${user.lastName}" "${user.firstName}`}
                />
              </Link>
            ) : (
              <Link href={"/login"} className="cursor-pointer">
                <UserRound strokeWidth={1.5} size={20} />
              </Link>
            )}
          </div>
        </div>

        <NavDrawer open={openMenu} onClose={() => setOpenMenu(false)} />

        <BaseModal
          width="4xl"
          classname="top-45"
          open={openSearch}
          onClose={() => setOpenSearch(false)}
        >
          <div></div>
        </BaseModal>
      </div>

      <div
        className={`w-full md:hidden overflow-hidden transition-all duration-200  ${openSearchMB ? "px-2 py-2  pb-3 opacity-100 translate-y-0" : "max-h-0 opacity-0 pointer-events-none -translate-y-2"}`}
      >
        <form onSubmit={handleSubmit}>
          <BaseInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            name="keyword"
            className="text-[14px]! px-5"
            placeholder="Search for products"
            autoFocus
            classProps={{
              inputClass:
                "border-none shadow-none rounded-full! ring-[1px] ring-gray-500! has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
              lableClass: "text-sm font-normal",
            }}
            addon={
              keyword ? (
                <SendHorizontal className="size-7 stroke-1" />
              ) : (
                <Search className="size-7 stroke-1" />
              )
            }
          />
        </form>
      </div>
    </>
  );
}
