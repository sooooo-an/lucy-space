"use client";

import React, { useState } from "react";
import Menu from "../ui/Menu";
import HeaderSubMenu from "./HeaderSubMenu";
import DropdownIcon from "../ui/icons/DropdownIcon";

const WEB_NAV_STYLE =
  "md:flex  md:block md:bg-transparent md:static md:shadow-none md:rounded-none md:px-0 md:border-0";
const MOBILE_NAV_STYLE =
  "absolute top-12 right-3 bg-background shadow-md rounded-md px-2 border border-border";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        className="absolute right-3 md:hidden flex items-center text-text-primary"
        onClick={onToggle}
      >
        메뉴
        <DropdownIcon isOpen={isOpen} />
      </button>

      <div
        className={`items-center justify-between flex-1  ${
          isOpen ? "block" : "hidden"
        } ${MOBILE_NAV_STYLE} ${WEB_NAV_STYLE}`}
      >
        <Menu />
        <HeaderSubMenu />
      </div>
    </>
  );
}
