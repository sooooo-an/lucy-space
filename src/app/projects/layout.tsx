import React from "react";
import ProjectLeftShelf from "@/components/ProjectLeftShelf";
// import ProjectContent from "@/components/ProjectContent";
// import ProjectRightShelf from "@/components/ProjectRightShelf";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full flex h-full">
      <section className="basis-1/5 min-w-[200px] bg-slate-900 p-3">
        <ProjectLeftShelf />
      </section>
      <section className="w-full bg-slate-50">
        {children}
        {/* <ProjectContent></ProjectContent> */}
      </section>
      {/* <section className="basis-1/3 bg-blue-300 min-w-[320px]">
        <ProjectRightShelf />
      </section> */}
    </section>
  );
}
