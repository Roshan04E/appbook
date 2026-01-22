import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Synapse - Your notes campanion",
};

export default async function SynapseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) redirect("/");
  return (
    <div className="flex h-screen @container">
      {/* Main */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
