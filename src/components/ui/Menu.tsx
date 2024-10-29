import React from "react";
import Link from "next/link";

interface MenuType {
  name: string;
  href: string;
  target?: string;
}

const MENUS: MenuType[] = [
  {
    name: "About",
    href: "https://sooooan.notion.site/About-111a7c38fabd805187f2f21159b234a9?pvs=74",
    target: "_blank",
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
        {MENUS.map(({ href, name, target }) => (
          <li key={href}>
            <Link href={href} target={target ? target : "_self"}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
