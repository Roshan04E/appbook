
import MacHeader from "@/components/shared/mac-header";
import MacDock from "@/components/shared/mac-dock";
import { WindowProvider } from "@/context/windowContext";
import WindowManager from "@/components/window-manager";
import RightClickProvider from "@/components/system-utils/right-click-handler";
import React from "react";

const HomeApp = ({children}: {children: React.ReactNode}) => {
    return(
        <>
        
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
        
        
        </>
    )
}

export default HomeApp;