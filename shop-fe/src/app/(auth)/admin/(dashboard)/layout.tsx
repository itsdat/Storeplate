import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AdminSlideBar from "@/layouts/auth/admin/dashboard/commons/AdminSlideBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSlideBar />
      <SidebarInset>
        <main className="flex-1 p-5 bg-(--color-foreground)">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
