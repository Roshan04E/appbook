import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AppBook",
  description: "MacBook-style app desktop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="portal-root" >
      <body
        className={`relative min-h-screen font-sans ${geistSans.variable} ${geistMono.variable}`}
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
