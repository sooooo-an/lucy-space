import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Lucy.Space.",
  description: "Lucy's Development Blog",
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.className} antialiased`}>
      <body>
        <ThemeProvider>
          <Header />
          <main className={`flex justify-center flex-1 `}>
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
