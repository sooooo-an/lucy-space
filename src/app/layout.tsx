import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { IBM_Plex_Sans_KR } from "next/font/google";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Lucy.Space.",
  description: "Lucy's Development Blog",
};

const openSans = Open_Sans({
  subsets: ["latin"],
});

const IBMPlexSans = IBM_Plex_Sans_KR({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.className} antialiased`}>
      <body>
        <Header />
        <main className={`flex justify-center flex-1 ${IBMPlexSans.className}`}>
          {children}
        </main>
        <Footer />
        <div id="portal" />
      </body>
    </html>
  );
}
