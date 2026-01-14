"use client";
import { useSession } from "@/context/SessionProvider";

export default function ProfileLayout() {
  const user = useSession();
  return (
    <div className="h-screen w-full max-w-7xl mx-auto">
      ProfileLayout {user?.email} {user?.username}
    </div>
  );
}
