"use client";

import React from "react";
import Link from "next/link";
import { RiAlarmWarningLine } from "react-icons/ri";
import { RiArchiveLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const PROJECT_MENUS = [
  {
    name: "Developers & Store",
    href: "developers-store",
    icon: <RiLoginBoxLine />,
  },
  {
    name: "Notification",
    href: "notification",
    icon: <RiAlarmWarningLine />,
  },
  {
    name: "Subtask",
    href: "subtask",
    icon: <RiArchiveLine />,
  },
];

export default function ProjectLeftShelf() {
  const pathname = usePathname();

  return (
    <>
      <h2 className="text-white text-xs pb-6">Projects</h2>
      <ul className=" text-white">
        {PROJECT_MENUS.map(({ href, icon, name }) => (
          <li key={href} className="mb-1">
            <Link
              className={`flex items-center gap-x-4 py-3 px-2 rounded-lg hover:bg-slate-500 ${
                pathname === `/projects/${href}` ? "bg-slate-500" : ""
              }`}
              href={`/projects/${href}`}
            >
              {icon}
              <span className="text-xs">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
