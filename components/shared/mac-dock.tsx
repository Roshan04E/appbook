'use client'

import { Globe, Settings, User } from "lucide-react"
import { useWindows } from "@/context/windowContext"
import { FaWikipediaW } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import AppMenu from "./app-menu"
import { CaretUpIcon, NotePencilIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import { log } from "console"

const apps = [
  { icon: Globe, id: "quiz" },
  { icon: User, id: "profile" },
  { icon: Settings, id: "settings" },
  { icon: FaWikipediaW, id: "wikiapp" },
  { icon: NotePencilIcon, id: "synapse" }
]


export default function MacDock() {
  const { windows, open, restore, minimize, close } = useWindows()

  const [hidden, setHidden] = useState(true)
  const [bouncing, setBouncing] = useState<string | null>(null)
  const [openedOnce, setOpenedOnce] = useState<Record<string, boolean>>({})
  const [menu, setMenu] = useState<{
    x: number
    y: number
    app: string | null
  } | null>(null)


  /* Detect fullscreen window */
  useEffect(() => {
    const detect = () => {
      let isMax = false
      document.querySelectorAll(".mac-window").forEach((w: any) => {
        if (
          Math.abs(w.offsetWidth - window.innerWidth) < 5 &&
          Math.abs(w.offsetHeight - window.innerHeight) < 5
        ) {
          isMax = true
        }
      })
      // setHidden(isMax)
    }
    const i = setInterval(detect, 200)
    return () => clearInterval(i)
  }, [])



  // Right click detect
  useEffect(() => {
    const close = () => setMenu(null)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [])


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
      app: appId
    })
  }



  const handleClick = (appId: string, win: any) => {
    if (!win) {
      open(appId)
      if (!openedOnce[appId]) {
        setBouncing(appId)
        setOpenedOnce(o => ({ ...o, [appId]: true }))
        setTimeout(() => setBouncing(null), 350) // ⚡ fast bounce
      }
    } else if (win.minimized) restore(win.id)
    else minimize(win.id)
  }



  const MenuItem = ({ text, onClick }: { text: string, onClick: () => void }) => (
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
  )


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
          <AppMenu className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm hover:scale-125 hover:shadow-lg transition-all duration-150 bg-white/60" />

          {/* Apps */}
          {apps.map(app => {
            const Icon = app.icon
            const win = windows.find(w => w.app === app.id)

            return (
              <button
                key={app.id}
                onClick={() => handleClick(app.id, win)}
                onContextMenu={e => handleRightClick(e, app.id)}
                className={`
            w-12 h-12 flex items-center justify-center
            rounded-xl shadow-sm
            hover:scale-125 hover:shadow-lg
            transition-all duration-150
            ${win?.minimized ? "bg-orange-200/80" : win ? "bg-white" : "bg-white/60"}
            ${bouncing === app.id ? "dock-bounce" : ""}
          `}
              >
                <Icon className="w-6 h-6 text-gray-800" />
              </button>
            )
          })}
        </div>

        {/* Toggle button fixed above dock */}
        <Button
          variant="ghost"
          size={'sm'}
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
                ? menu.y - 160   // show above
                : menu.y        // show below
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
          <MenuItem
            text="Open"
            onClick={() => open(menu.app!)}
          />

          <MenuItem
            text="Close"
            onClick={() => {
              const win = windows.find(w => w.app === menu.app)
              if (win) close(win.id)
            }}
          />

          <MenuItem
            text="Minimize"
            onClick={() => {
              const win = windows.find(w => w.app === menu.app)
              if (win) minimize(win.id)
              
            }}
          />
          {/* <hr />
          <MenuItem text="Pin to Dock" /> */}
        </div>
      )}



    </>

  )
}
