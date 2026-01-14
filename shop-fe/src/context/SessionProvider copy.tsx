"use client";

import { createContext, ReactNode, useContext } from "react";

export interface SessionValue {
  userId: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

type SessionContextType = SessionValue | null;

const SessionContext = createContext<SessionContextType>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: SessionContextType;
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
