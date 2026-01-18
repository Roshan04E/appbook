import type { Metadata } from "next";
import MacHeader from "@/components/shared/mac-header";
import MacDock from "@/components/shared/mac-dock";
import { WindowProvider } from "@/context/windowContext";
import WindowManager from "@/components/window-manager";
import RightClickProvider from "@/components/system-utils/right-click-handler";

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
    <RightClickProvider>
      <WindowProvider>
        {/* Wallpaper */}
        <div
          className="
              fixed inset-0 -z-10
              bg-[url('/wallpaper.jpg')]
              bg-cover bg-center
            "
        />

        {/* Header */}
        <MacHeader />

        {/* Window system */}
        <WindowManager />

        {/* Main content (optional for static pages) */}
        <main className="">{children}</main>

        {/* Dock */}
        <MacDock />
      </WindowProvider>
    </RightClickProvider>
  );
}
