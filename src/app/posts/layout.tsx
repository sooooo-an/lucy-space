import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { Metadata } from "next";

const IBMPlexSans = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
});

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
  return (
    <>
      <Header />
      <main className={`flex justify-center flex-1 ${IBMPlexSans.className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
