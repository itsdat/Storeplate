import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedUserRoutes = ["/profile"];
const protectedAdminRoutes = ["/admin/dashboard"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;
  const session = token ? await decrypt(token) : null;

  // 🔒 ADMIN ROUTES
  if (protectedAdminRoutes.includes(path)) {
    if (!session?.role === 'admin' as any || !session?.role === 'staff' as any) {
      return NextResponse.redirect(new URL("/admin/login", req.url)); 
    }
  }

  // 🔒 USER ROUTES
  if (protectedUserRoutes.includes(path)) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔁 Đã login mà vào login/signup
  if ((path === "/login" || path === "/signup") && session?.userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔁 Đã login mà vào login/signup
  if ((path === "/admin/login") && session?.id && (session?.role === 'admin' as any || session?.role === 'staff' as any)) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}
