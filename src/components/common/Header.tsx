import React from "react";
import Logo from "../ui/Logo";
import Menu from "../ui/Menu";

export default function Header() {
  return (
    <header className="flex items-center justify-center py-8">
      <div className="flex container items-center justify-between">
        <Logo />
        <Menu />
      </div>
    </header>
  );
}
