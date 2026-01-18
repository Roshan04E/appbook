import RightClickProvider from "@/components/system-utils/right-click-handler";
import WindowManager from "@/components/window-manager";
import { WindowProvider } from "@/context/windowContext";
import styles from "./layout.module.css";
import { BinaryLoader } from "@/app/(auth)/binary-loader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!!session?.user) {
    redirect("/");
  }
  return (
    <RightClickProvider>
      <WindowProvider>
        {/* Background */}
        <div className={`fixed inset-0 -z-10 ${styles.cyberBg}`} />

        {/* Cyber overlay */}
        <div className="fixed inset-0 flex flex-col items-center pt-24 gap-4 pointer-events-none">
          <h1 className={styles.accessText}>ACCESS DENIED</h1>
          <BinaryLoader />
        </div>

        <div className="h-screen flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <WindowManager />
            {children}
          </div>
        </div>
      </WindowProvider>
    </RightClickProvider>
  );
}
