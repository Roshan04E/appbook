"use client";

import { Globe, Settings, User } from "lucide-react";
import { useWindows } from "@/context/windowContext";
import { FaWikipediaW } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import AppMenu from "./app-menu";
import {
  CaretUpIcon,
  CheckSquareOffsetIcon,
  HourglassSimpleIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { log } from "console";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const apps = [
  { icon: Globe, id: "quiz" },
  { icon: User, id: "profile" },
  { icon: Settings, id: "settings" },
  { icon: FaWikipediaW, id: "wikiapp" },
  { icon: NotePencilIcon, id: "synapse" },
  { icon: CheckSquareOffsetIcon, id: "toodles" },
  { icon: HourglassSimpleIcon, id: "focusy" },
];

export default function MacDock() {
  const { windows, open, restore, minimize, close } = useWindows();

  const [hidden, setHidden] = useState(false);
  const [bouncing, setBouncing] = useState<string | null>(null);
  const [openedOnce, setOpenedOnce] = useState<Record<string, boolean>>({});
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    app: string | null;
  } | null>(null);

  /* Detect fullscreen window */
  useEffect(() => {
    const detect = () => {
      let isMax = false;
      document.querySelectorAll(".mac-window").forEach((w: any) => {
        if (
          Math.abs(w.offsetWidth - window.innerWidth) < 5 &&
          Math.abs(w.offsetHeight - window.innerHeight) < 5
        ) {
          isMax = true;
        }
      });
      // setHidden(isMax)
    };
    const i = setInterval(detect, 200);
    return () => clearInterval(i);
  }, []);

  // Right click detect
  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // Disable main menu
  // useEffect(() => {
  //   const hideMenu = (e: MouseEvent) => e.preventDefault()
  //   window.addEventListener("contextmenu", hideMenu)
  //   return () => window.removeEventListener("contextmenu", hideMenu, { capture: true })
  // }, [])

  const handleRightClick = (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({
      x: e.clientX,
      y: e.clientY,
      app: appId,
    });
  };

  const handleClick = (appId: string, win: any) => {
    if (!win) {
      open(appId);
      if (!openedOnce[appId]) {
        setBouncing(appId);
        setOpenedOnce((o) => ({ ...o, [appId]: true }));
        setTimeout(() => setBouncing(null), 350); // ⚡ fast bounce
      }
    } else if (win.minimized) restore(win.id);
    else minimize(win.id);
  };

  const MenuItem = ({
    text,
    onClick,
  }: {
    text: string;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="
      px-3 py-2 rounded-lg
      hover:bg-black/10
      cursor-pointer
    "
    >
      {text}
    </div>
  );

  return (
    <>
      <footer>
        {/* Dock container */}
        <div
          data-dock
          className={`
      fixed bottom-6 left-1/2 -translate-x-1/2
      bg-white/10 backdrop-blur-md border border-white/20
      px-3 py-2 rounded-2xl shadow-lg
      flex gap-3 items-end
      transition-all duration-1000 ease-in-out
      ${hidden ? "translate-y-28 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
    `}
        >
          {/* Menu */}
          <AppMenu />

          {/* Apps */}
          {apps.map((app) => {
            const Icon = app.icon;
            const win = windows.find((w) => w.app === app.id);

            return (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <div className="relative group">
                    <Button
                      // logic preserved
                      onClick={() => handleClick(app.id, win)}
                      onContextMenu={(e) => handleRightClick(e, app.id)}
                      className={cn(
                        // Base macOS Style: Squircle shape & Glassmorphism
                        "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ease-out",
                        "border border-white/20 shadow-sm backdrop-blur-md",
                        "hover:scale-125 hover:shadow-xl hover:z-50",

                        // Logic-based Styling
                        bouncing === app.id ? "animate-bounce" : "",
                        win?.minimized
                          ? "bg-white/30 brightness-90 opacity-80" // Minimized state
                          : win
                            ? "bg-white/40 shadow-inner" // Active/Open state
                            : "bg-white/20 hover:bg-white", // Not open

                        "text-gray-900 dark:text-white",
                      )}
                    >
                      <Icon weight="regular" className="w-7 h-7" />
                    </Button>

                    {/* macOS Active Indicator Dot */}
                    {win && (
                      <div
                        className={cn(
                          "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300",
                          win.minimized
                            ? "bg-white/40"
                            : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]",
                        )}
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-black/80 text-white border-none backdrop-blur-md px-3 py-1 text-xs"
                >
                  {app.id}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Toggle button fixed above dock */}
        <Button
          variant="ghost"
          size={"sm"}
          onMouseEnter={() => setHidden(!hidden)}
          className="
            fixed bottom-0 left-1/2 -translate-x-1/2
            text-gray-700 hover:bg-white/20
            h-6 w-90 rounded-md gap-1
          "
        >
          <CaretUpIcon
            className={`text-white transition-transform duration-300 ${hidden ? "rotate-0" : "rotate-180"}`}
          />
        </Button>
      </footer>

      {menu && (
        <div
          style={{
            left: menu.x,
            top:
              menu.y + 160 > window.innerHeight
                ? menu.y - 160 // show above
                : menu.y, // show below
          }}
          className="
            fixed z-[9999]
            bg-white/80 backdrop-blur-md
            border border-gray-200
            rounded-xl shadow-xl
            w-44 p-1 text-sm
          "
          onClick={() => setMenu(null)}
        >
          <MenuItem text="Open" onClick={() => open(menu.app!)} />

          <MenuItem
            text="Close"
            onClick={() => {
              const win = windows.find((w) => w.app === menu.app);
              if (win) close(win.id);
            }}
          />

          <MenuItem
            text="Minimize"
            onClick={() => {
              const win = windows.find((w) => w.app === menu.app);
              if (win) minimize(win.id);
            }}
          />
          {/* <hr />
          <MenuItem text="Pin to Dock" /> */}
        </div>
      )}
    </>
  );
}
