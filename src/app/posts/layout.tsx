import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Lucy.Space.",
    template: "Lucy.Space. | %s",
  },
  description: "Lucy.Space. 개발 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
