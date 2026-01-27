"use client";

import {
  User,
  ChevronsUpDown,
  LogOut,
  LayoutGrid,
  UsersRound,
  LibraryBig,
  ShieldUser,
  Layers,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminProfileDrawer from "./AdminProfileDrawer";
import { useState } from "react";
import { LogoIcon } from "@/components/common/icons/BaseIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import ThemeToggle from "@/components/feature/theme/ThemeToggle";
import { useTheme } from "next-themes";

interface MenuDashboardItemsProps {
  label: string;
  icon: React.ReactNode;
  slug: string;
}

const MenuDashboardItems: MenuDashboardItemsProps[] = [
  {
    label: "Dashboard",
    icon: (
      <LayoutGrid
        color="currentColor"
        width={18}
        height={18}
        strokeWidth={1.5}
      />
    ),
    slug: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: (
      <UsersRound
        color="currentColor"
        width={18}
        height={18}
        strokeWidth={1.5}
      />
    ),
    slug: "/admin/users",
  },
  {
    label: "Products",
    icon: (
      <Layers color="currentColor" width={18} height={18} strokeWidth={1.5} />
    ),
    slug: "/admin/products",
  },
  {
    label: "Collections",
    icon: (
      <LibraryBig
        color="currentColor"
        width={18}
        height={18}
        strokeWidth={1.5}
      />
    ),
    slug: "/admin/collections",
  },
  {
    label: "Roles & Permissons",
    icon: (
      <ShieldUser
        color="currentColor"
        width={18}
        height={18}
        strokeWidth={1.5}
      />
    ),
    slug: "/admin/roles",
  },
];

export default function AdminSlideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // const handleLogout = async () => {
  //   try {
  //     await adminLogout();
  //     router.replace("/admin/login");
  //     showSuccessToast("Đăng xuất thành công");
  //   } catch (error) {
  //     showErrorToast("Đăng xuất thất bại");
  //     console.log("error", error);
  //   }
  // };

  const handleSetTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Sidebar
      collapsible="icon"
      className="bg-(--color-background) border-(--color-border)"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent active:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <LogoIcon />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-(--color-title)">
                  Storelapte
                </span>
                <span className="truncate text-xs text-(--color-text)">
                  Admin dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-(--color-title)">
            Platform
          </SidebarGroupLabel>
          <SidebarMenu>
            {MenuDashboardItems.map((item, index) => (
              <Link href={item.slug} key={index}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.label}
                    className={`hover:bg-(--color-btn) hover:text-(--color-text-btn) text-(--color-text) active:bg-(--color-btn) cursor-pointer ${
                      pathname === item.slug &&
                      "bg-(--color-btn) text-(--color-text-btn)"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <div className="flex items-center justify-between w-full">
        <SidebarFooter className="flex-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="outline-0! focus:outline-0! active:outline-0! bg-(--color-border)! rounded-sm hover:bg-(--color-dark-light)!"
                >
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus:outline-0"
                  >
                    {/* <Avatar className="max-w-10 max-h-10 object-cover">
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar> */}

                    <BaseAvatar />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-(--color-title)">
                        {/* {adminData?.username} */}
                      </span>
                      <span className="truncate text-xs text-(--color-text)">
                        {/* {adminData?.email} */}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-(--color-title)" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-(--color-card) border-(--color-dark-light)"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    className="text-(--color-text) hover:bg-(--color-dark-light)! hover:text-(--color-text)!"
                    onClick={() => setOpenProfile(true)}
                  >
                    <User className="mr-2 size-4 text-(--color-text)" />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-(--color-text) hover:bg-(--color-dark-light)! hover:text-(--color-text)!"
                    onClick={handleSetTheme}
                  >
                    <div className="-translate-x-1">
                      <ThemeToggle />
                    </div>
                    <span className="capitalize">{theme}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-(--color-text) hover:bg-(--color-primary)! hover:text-white!"
                    // onClick={handleLogout}
                  >
                    <LogOut className="mr-2 size-4  hover:text-white!" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <div className="flex items-center justify-end">
          <SidebarTrigger size="lg" className="p-5 mr-2" />
        </div>
      </div>
      <AdminProfileDrawer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
    </Sidebar>
  );
}
