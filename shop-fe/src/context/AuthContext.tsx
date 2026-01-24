"use client";
import { AuthApis } from "@/apis";
import { useToast } from "@/hooks/others/useToast.hook";
import { IUser } from "@/interfaces/user/user.interface";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user?: IUser;
  refreshUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>();
  const { toastError, toastSuccess } = useToast();
  const router = useRouter();

  const refreshUser = async () => {
    const res = await AuthApis.getMe();
    setUser(res.data);
  };

  const logoutUser = async () => {
    try {
      await AuthApis.logout();
      toastSuccess("Success", "Logout successfully");
      setUser(undefined);
      router.replace("/");
    } catch (error: any) {
      toastError("Fail", error.message);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
