"use client"
import { AuthApis } from "@/apis";
import { IUser } from "@/interfaces/user/user.interface";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user?: IUser;
  refreshUser: () => Promise<void>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>();

  const refreshUser = async () => {
    const res = await AuthApis.getMe();
    setUser(res.data);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
