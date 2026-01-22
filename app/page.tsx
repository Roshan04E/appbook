import MacHeader from "@/components/shared/mac-header";
import MacDock from "@/components/shared/mac-dock";
import { WindowProvider } from "@/context/windowContext";
import WindowManager from "@/components/window-manager";
import RightClickProvider from "@/components/system-utils/right-click-handler";
import React from "react";
import { auth } from "@/auth";

const HomeApp = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div>
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

          {/* Window system */}
          <WindowManager />

          {/* Header */}
          <MacHeader user={session?.user} />

          {/* Main content (optional for static pages) */}
          <main className="">{children}</main>
          <div>Hello</div>
          {/* Dock */}
          <MacDock />
        </WindowProvider>
      </RightClickProvider>
    </div>
  );
};

export default HomeApp;
