'use client'

import { cn } from "@/lib/utils"
import {
  BookOpenIcon,
  BrainIcon,
  CheckSquareIcon,
  GearIcon,
  GlobeIcon,
  GridFourIcon,
  UserIcon
} from "@phosphor-icons/react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react"
import { useWindows } from "@/context/windowContext"
import { createPortal } from "react-dom"

const categories = {
  system: [
    { id: "settings", icon: GearIcon, color: "bg-gray-500" },
    { id: "profile", icon: UserIcon, color: "bg-blue-500" }
  ],
  tools: [
    { id: "synapse", icon: BrainIcon, color: "bg-purple-500" },
    { id: "toodles", icon: CheckSquareIcon, color: "bg-orange-500" }
  ],
  web: [
    { id: "wikiapp", icon: BookOpenIcon, color: "bg-emerald-500" },
    { id: "quiz", icon: GlobeIcon, color: "bg-sky-500" }
  ]
}

export default function AppMenu({ className }: { className?: string }) {
  const { open } = useWindows()
  const [show, setShow] = useState(false)
  const [active, setActive] = useState<keyof typeof categories>("system")

  return (
    <div className="relative">
      {/* Launcher Button (The "Dock" Icon) */}
      <Button
        variant="ghost"
        onClick={() => setShow(!show)}
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ease-out",
          "border border-white/20 shadow-sm backdrop-blur-md",
          "hover:scale-125 hover:shadow-xl hover:z-50",
          show ? "bg-white/30 shadow-inner" : "bg-white/30 shadow-inner",
          className
        )}
      >
        <GridFourIcon size={28} weight="fill" className="drop-shadow-md" />
      </Button>

      {show && createPortal(
        <>
          {/* Overlay to close when clicking outside */}
          {show && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShow(false)}
            />
          )}
          <div className="
          fixed bottom-24 left-1/2 -translate-x-1/2
          w-[95vw] max-w-[640px] h-[380px]
          bg-[#F5F5F7]/70 dark:bg-[#1C1C1E]/80 backdrop-blur-3xl
          rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          border border-white/30 dark:border-white/10
          flex overflow-hidden z-50
          animate-in fade-in zoom-in-95 duration-200
        ">

            {/* Sidebar (macOS Visual Style) */}
            <div className="
            w-40 p-4 space-y-1
            bg-white/20 dark:bg-black/10 backdrop-blur-xl
            border-r border-black/5 dark:border-white/5
          ">
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                Library
              </p>
              {Object.keys(categories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat as any)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                    active === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Apps Grid */}
            <div className="flex-1 p-8 grid grid-cols-3 sm:grid-cols-4 gap-6 overflow-y-auto">
              {categories[active].map(app => {
                const Icon = app.icon
                return (
                  <Tooltip key={app.id} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <button
                          onClick={() => {
                            open(app.id)
                            setShow(false) // Close menu on app launch
                          }}
                          className={cn(
                            "h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                            "shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 group-active:scale-95",
                            "bg-gradient-to-br from-white/80 to-white/40 dark:from-white/20 dark:to-white/5 border border-white/20"
                          )}
                        >
                          <Icon
                            size={32}
                            weight="regular"
                            className="text-slate-700 dark:text-white drop-shadow-sm"
                          />
                        </button>
                        <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate w-full text-center">
                          {app.id}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-black/80 text-white border-none backdrop-blur-md">
                      Launch {app.id}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>

          </div>
        </>


        ,
        document.getElementById('portal-root') ?? document.body
      )}


    </div>
  )
}