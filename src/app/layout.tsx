import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lucy.Space.",
  description: "Lucy's Development Blog",
};

const openSans = Open_Sans({
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
        <main className="flex items-center justify-center flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
