import React from "react";
import ProjectLeftShelf from "@/components/projects/ProjectLeftShelf";
import ProjectContent from "@/components/projects/ProjectContent";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginModalProvider } from "@/contexts/LoginModalContext";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full flex h-full">
      <AuthProvider>
        <LoginModalProvider>
          <section className="basis-1/6 min-w-[240px] bg-white p-2 border-r">
            <ProjectLeftShelf />
          </section>
          <section className="w-full bg-slate-50 flex flex-col overflow-x-hidden">
            <ProjectContent>{children}</ProjectContent>
          </section>
        </LoginModalProvider>
      </AuthProvider>
    </section>
  );
}
