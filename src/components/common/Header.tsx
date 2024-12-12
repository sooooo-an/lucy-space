import React from "react";
import Logo from "../ui/Logo";
import Nav from "../ui/Nav";

export default function Header() {
  return (
    <header className="flex items-center justify-center sticky top-0 bg-background border-b border-b-border">
      <div className="flex container items-center py-4 relative px-2">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}
