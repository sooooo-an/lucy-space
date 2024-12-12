"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuType {
  name: string;
  href: string;
}

const MENUS: MenuType[] = [
  {
    name: "블로그",
    href: "/posts",
  },
];

const RIGHT_LINE_STYLE =
  "before:absolute before:w-[1px] before:h-4 before:bg-gray-500 before:left-0 before:top-1 before:hidden md:before:block";

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className={`relative ${RIGHT_LINE_STYLE} py-2 text-center md:py-0`}>
      <ul className="gap-4 md:pl-3">
        {MENUS.map(({ href, name }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${
                pathname.startsWith(href) && "text-primary font-semibold"
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
