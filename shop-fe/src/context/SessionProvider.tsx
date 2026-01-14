"use client";

import { createContext, ReactNode, useContext } from "react";

export interface SessionValue {
  userId: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: SessionValue | null;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
