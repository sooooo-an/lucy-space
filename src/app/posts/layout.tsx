import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex justify-center flex-1">{children}</main>
      <Footer />
    </>
  );
}
