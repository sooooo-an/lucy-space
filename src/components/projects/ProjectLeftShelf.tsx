"use client";

import React from "react";

import ProjectMenu from "./ProjectMenu";
import Logo from "../ui/Logo";

export default function ProjectLeftShelf() {
  return (
    <>
      <section className="flex gap-x-2 items-center px-2 h-[60px] border-b">
        <Logo />
      </section>
      <ProjectMenu />
    </>
  );
}
