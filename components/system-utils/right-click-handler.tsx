'use client'
import { useEffect, useState } from "react"

export default function RightClickProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest("[data-dock]")) return

      e.preventDefault()
      setPos({ x: e.clientX, y: e.clientY })
      setShow(true)
    }


    document.addEventListener("contextmenu", handler)
    document.addEventListener("click", () => setShow(false))

    return () => {
      document.removeEventListener("contextmenu", handler)
    }
  }, [])

  return (
    <>
      {children}

      {show && (
        <div
          style={{ top: pos.y, left: pos.x }}
          className="fixed bg-white text-black rounded-xl shadow-xl p-2 text-sm"
        >
          <div className="px-3 py-1 hover:bg-gray-200 rounded">Open</div>
          <div className="px-3 py-1 hover:bg-gray-200 rounded">Rename</div>
          <div className="px-3 py-1 hover:bg-gray-200 rounded">Delete</div>
        </div>
      )}
    </>
  )
}
