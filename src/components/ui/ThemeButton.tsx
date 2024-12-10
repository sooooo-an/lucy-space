"use client";

import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import ThemeIcon from "./icons/ThemeIcon";

export default function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      <ThemeIcon isDarkmode={isDark} />
    </button>
  );
}
