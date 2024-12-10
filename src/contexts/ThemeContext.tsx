"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "@/types/localStorage";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type ThemeProviderType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeProviderType>({
  isDark: false,
  toggleTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [isDark, setDark] = useState(false);

  useLayoutEffect(() => {
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = getLocalStorage(LOCAL_STORAGE_KEY.IS_DARK);
    setDark(savedTheme ?? osTheme);

    const htmlEl = document.querySelector("html");
    if (htmlEl) {
      htmlEl.classList.toggle("dark", savedTheme ?? osTheme);
    }
  }, [getLocalStorage]);

  useEffect(() => {
    const htmlEl = document.querySelector("html");
    htmlEl?.classList.toggle("dark", isDark);
    setLocalStorage("isDark", isDark);
  }, [isDark, setLocalStorage]);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
