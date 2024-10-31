"use client";

import { UserData } from "@/types/user";
import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: UserData | null;
  login: (name: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const uuid = getCookie("uuid");
    if (uuid) {
      fetch(`/api/user/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, []);

  const login = async (name: string, password: string) => {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  };

  const logout = async () => {
    return fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
