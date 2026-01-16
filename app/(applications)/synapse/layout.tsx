export default function SynapseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="flex h-screen">

          {/* Main */}
          <main className="flex-1 p-6">
            {children}
          </main>

        </div>
  )
}
