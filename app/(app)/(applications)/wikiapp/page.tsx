'use client'
import { useState } from "react"

export default function WikiApp() {
  const [term, setTerm] = useState("Wiki Home")
  const [url, setUrl] = useState(
    "https://en.wikipedia.org/wiki/"
  )
  const [loading, setLoading] = useState(true)

  const search = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setUrl(
      "https://en.wikipedia.org/wiki/" +
      term.replaceAll(" ", "_")
    )
  }

  return (
    <div className="w-full h-full flex flex-col relative">

      <form onSubmit={search}>
        <input
          className="w-full p-2 text-sm border"
          placeholder="Search Wikipedia"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      {/* Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      )}

      <iframe
        src={url}
        className="flex-1 w-full border-none"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
