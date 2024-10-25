import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
