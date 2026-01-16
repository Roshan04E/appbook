'use client'
import { useState, useEffect } from "react"
import { useWindows, Win } from "@/context/windowContext"

const DEFAULT = { x: 200, y: 120, w: 720, h: 520 }

export default function MacWindow({
  children,
  win,
  onFocus
}: {
  children: React.ReactNode
  win: Win
  onFocus: () => void
}) {
  const { close, minimize } = useWindows()
  const [box, setBox] = useState(DEFAULT)
  const [max, setMax] = useState(false)
  const [prevBox, setPrevBox] = useState(DEFAULT)



  // Placement logic
  useEffect(() => {

    // Mobile → full screen
    if (window.innerWidth < 768) {
      setBox({
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
      })
      setMax(true)
      return
    }

    // Desktop → center + cascade
    const centerX = (window.innerWidth - DEFAULT.w) / 2
    const centerY = (window.innerHeight - DEFAULT.h) / 2

    const offset = (win.z - 1) * 30

    setBox({
      x: centerX + offset,
      y: centerY + offset,
      w: DEFAULT.w,
      h: DEFAULT.h
    })

  }, [])


  // Drag
  const drag = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return
    if (max) return
    onFocus()

    const sx = e.clientX, sy = e.clientY
    const { x, y } = box

    const move = (ev: MouseEvent) => {
      setBox({
        ...box,
        x: x + ev.clientX - sx,
        y: y + ev.clientY - sy
      })
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", move)
    }, { once: true })
  }

  // Maximize / Restore
  // const toggleMax = () => {
  //   if (!max) {
  //     setBox({
  //       x: 0,
  //       y: 0,
  //       w: window.innerWidth,
  //       h: window.innerHeight
  //     })
  //   } else {
  //     setBox(DEFAULT)
  //   }
  //   setMax(!max)
  // }

  const toggleMax = () => {
  if (!max) {
    // Store current position before maximizing
    setPrevBox(box)
    setBox({
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight
    })
  } else {
    // Restore previous position
    setBox(prevBox)
  }
  setMax(!max)
}


  // Resize
  const resize = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    if (max) return
    onFocus()

    const startX = e.clientX
    const startY = e.clientY
    const startBox = { ...box }

    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      const newBox = { ...startBox }

      if (dir.includes("right"))
        newBox.w = Math.max(200, startBox.w + dx)

      if (dir.includes("left")) {
        newBox.w = Math.max(200, startBox.w - dx)
        newBox.x = startBox.x + dx
      }

      if (dir.includes("bottom"))
        newBox.h = Math.max(150, startBox.h + dy)

      if (dir === "top") {
        newBox.h = Math.max(150, startBox.h - dy)
        newBox.y = startBox.y + dy
      }

      setBox(newBox)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", move)
    }, { once: true })
  }

  const cursors: Record<string, string> = {
    top: "n-resize",
    right: "e-resize",
    "bottom-right": "se-resize",
    bottom: "s-resize",
    "bottom-left": "sw-resize",
    left: "w-resize"
  }

  return (
    <div
      onMouseDown={onFocus}
      style={{
        width: box.w,
        height: box.h,
        left: box.x,
        top: box.y,
        zIndex: win.z,
        maxWidth: "100vw",
        maxHeight: "100vh",

        /* 👇 state preserved, just hidden */
        opacity: win.minimized ? 0 : 1,
        pointerEvents: win.minimized ? "none" : "auto"
      }}
      className="fixed bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
    >
      {/* Title bar */}
      <div
        onMouseDown={drag}
        onDoubleClick={toggleMax}
        className="h-10 flex items-center gap-3 px-3 pl-6 bg-gray-100/80 select-none cursor-move"
      >
        <button
          onClick={() => close(win.id)}
          className="w-3 h-3 bg-red-500 rounded-full"
        />
        <button
          onClick={() => minimize(win.id)}
          className="w-3 h-3 bg-yellow-400 rounded-full"
        />
        <button
          onClick={toggleMax}
          className="w-3 h-3 bg-green-500 rounded-full"
        />

        <span className="flex-1 text-center font-medium text-gray-700 pointer-events-none">
          {win.app.charAt(0).toUpperCase() + win.app.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] rounded-2xl overflow-auto relative">
        {children}
      </div>

      {/* Resize handles */}
      {["top","right","bottom-right","bottom","bottom-left","left"].map(dir => (
        <div
          key={dir}
          onMouseDown={resize(dir)}
          className={`
            absolute z-50
            ${dir.includes("top") ? "top-0" : dir.includes("bottom") ? "bottom-0" : ""}
            ${dir.includes("left") ? "left-0" : dir.includes("right") ? "right-0" : ""}
            ${dir.includes("top") || dir.includes("bottom")
              ? (dir.includes("left") || dir.includes("right")
                ? "w-6 h-6"
                : "h-2 w-full")
              : ""}
            ${dir.includes("left") || dir.includes("right")
              ? (dir.includes("top") || dir.includes("bottom")
                ? "w-6 h-6"
                : "w-2 h-full")
              : ""}
          `}
          style={{ cursor: cursors[dir], userSelect: "none" }}
        />
      ))}
    </div>
  )
}
