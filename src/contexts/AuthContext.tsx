"use client";

import { UserData } from "@/types/user";
import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { httpClient } from "@/utils/httpClient";

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: UserData | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const uuid = getCookie("uuid");
    if (uuid) {
      httpClient
        .get<{ user: UserData }>(`/api/user/${uuid}`)
        .then(({ data }) => {
          setUser(data.user);
        });
    }
  }, []);

  const login = async (name: string, password: string) => {
    return httpClient
      .post<{ user: UserData }>("/api/login", {
        body: { name, password },
      })
      .then(({ data }) => setUser(data.user))
      .catch((error) => console.error(error));
  };

  const logout = async () => {
    return httpClient.post("/api/logout").then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
