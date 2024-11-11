"use client";

import { UserData } from "@/types/user";
import React, { useState, useContext, useEffect } from "react";
import { handleAuthState, handleLogin, handleLogout } from "@/services/users";

type Props = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: UserData | null;
  login: (email: string, password: string) => Promise<UserData>;
  logout: () => void;
  updateUser: (user: Partial<UserData>) => void;
};

const AuthContext = React.createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = handleAuthState((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    return handleLogin({ email, password }).then((user: UserData) => {
      return user;
    });
  };

  const logout = async () => {
    return handleLogout().then(() => setUser(null));
  };

  const updateUser = async (update: Partial<UserData>) => {
    setUser((prev) => {
      if (!prev) {
        return null;
      }

      return { ...prev, ...update };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
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
