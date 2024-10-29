"use client";

import React from "react";

import UserProfile from "../ui/UserProfile";
import ProjectMenu from "./ProjectMenu";
import Logo from "../ui/Logo";

import { useAuth } from "@/contexts/AuthContext";

export default function ProjectLeftShelf() {
  const { user, logout } = useAuth();
  return (
    <>
      {user ? (
        <UserProfile user={user} logout={logout} />
      ) : (
        <section className="flex gap-x-2 items-center px-2 h-[60px] border-b">
          <Logo />
        </section>
      )}
      <ProjectMenu />
    </>
  );
}
