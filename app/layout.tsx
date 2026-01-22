import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "AppBook",
  description: "MacBook-style app desktop",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/appbook.svg",
        href: "/appbook.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/appbook-dark.svg",
        href: "/appbook-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="portal-root">
      <body
        className={`relative min-h-screen font-sans ${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
      >
        <Toaster />
        <SessionProvider>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
