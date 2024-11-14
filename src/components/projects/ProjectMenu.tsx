"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { HomeIcon, LinkIcon, TaskIcon } from "../ui/icons";
const PROJECT_MENUS = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Developers & Store",
    href: "/projects/developers-store",
    icon: <LinkIcon />,
  },
  {
    name: "Subtask",
    href: "/projects/subtask",
    icon: <TaskIcon />,
  },
];
const ACTIVE_CLASSNAME = "bg-gray-200 text-gray-900 font-bold";
const INACTIVE_CLASSNAME = "text-gray-400 font-semibold";

export default function ProjectMenu() {
  const pathname = usePathname();

  return (
    <ul className="mt-5">
      {PROJECT_MENUS.map(({ href, icon, name }) => (
        <li key={href} className="mb-1">
          <Link
            title={`Go to ${name}`}
            className={`flex items-center gap-x-2 py-3 px-2 rounded-md hover:bg-gray-200 hover:text-gray-900 ${
              pathname === href ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME
            }`}
            href={href}
          >
            {icon}
            <span className="text-sm">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
