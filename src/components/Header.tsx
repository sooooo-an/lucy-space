import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";

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
