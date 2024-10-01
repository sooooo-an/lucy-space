import React from "react";
import Link from "next/link";

interface MenuType {
  name: string;
  href: string;
}

const MENUS: MenuType[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];

export default function Menu() {
  return (
    <nav>
      <ul className="flex gap-4 font-bold">
        {MENUS.map((menu) => (
          <li key={menu.href}>
            <Link href={menu.href}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
