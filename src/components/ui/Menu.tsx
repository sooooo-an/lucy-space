import React from "react";
import Link from "next/link";

interface MenuType {
  name: string;
  href: string;
}

const MENUS: MenuType[] = [
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
        {MENUS.map(({ href, name }) => (
          <li key={href}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
