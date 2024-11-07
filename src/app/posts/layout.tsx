import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IBM_Plex_Sans_KR } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
});

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
