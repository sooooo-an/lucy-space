import React from "react";
import ProjectLeftShelf from "@/components/ProjectLeftShelf";
import ProjectContent from "@/components/ProjectContent";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full flex h-full">
      <section className="basis-1/6 min-w-[240px] bg-white p-2 border-r">
        <ProjectLeftShelf />
      </section>
      <section className="w-full bg-slate-50 flex flex-col overflow-x-hidden">
        <ProjectContent>{children}</ProjectContent>
      </section>
    </section>
  );
}
