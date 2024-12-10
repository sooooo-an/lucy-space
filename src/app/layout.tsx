import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { IBM_Plex_Sans_KR } from "next/font/google";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
        <ThemeProvider>
          <Header />
          <main
            className={`flex justify-center flex-1 ${IBMPlexSans.className}`}
          >
            <div className="flex flex-col max-w-full lg:w-[900px] px-2">
              {children}
            </div>
          </main>
          <Footer />
          <div id="portal" />
        </ThemeProvider>
      </body>
    </html>
  );
}
