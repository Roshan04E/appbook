"use client";

import { Button } from "@/components/ui/button";
import { useSynapse } from "../../store/useSynapse";
import {
  ArrowsHorizontalIcon,
  CaretDoubleLeftIcon,
  CornersOutIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, useCallback, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Home, Menu, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UserItems from "./ui-sidebar/user-items";
import { DocumentList } from "./ui-sidebar/document-list";
import { createDocument } from "@/lib/database/tables/documents/action";
import { toast } from "sonner";
import { useDocumentStore } from "../../store/useDocumentStore";
import AnimatedLine from "../ui/animated-line";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const { setRoute } = useSynapse();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const [_, startTransition] = useTransition();
  const { addDocument } = useDocumentStore();
  const { openDocument } = useSynapse();

  // --- Dragging logic (Unchanged) ---
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = e.clientX;
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        newWidth = e.clientX - rect.left;
      }
      if (newWidth < 120) {
        setIsCollapsed(true);
        isResizingRef.current = false;
      } else {
        setIsCollapsed(false);
        if (newWidth > 480) newWidth = 480;
        if (newWidth < 240) newWidth = 240;
        setSidebarWidth(newWidth);
      }
    },
    [setIsCollapsed],
  );

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);
    document.body.style.cursor = "default";
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResetWidth = () => {
    setSidebarWidth(240);
    setIsCollapsed(false);
  };

  // FUNCTIONS
  const onCreate = () => {
    startTransition(async () => {
      const { success, message, data } = await createDocument({
        title: "Untitled",
        is_archived: false,
        is_published: false,
      });
      if (!success) {
        toast.error(message);
        return;
      }
      addDocument(data);
      openDocument(data.id);
      toast.success(message);
    });
  };

  return (
    <>
      <motion.aside
        ref={sidebarRef}
        transition={
          isResizing
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 30 }
        }
        animate={{
          width: isCollapsed ? 0 : sidebarWidth,
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? "none" : "auto",
        }}
        style={{ zIndex: isCollapsed ? 0 : 50 }}
        className={cn(
          "group/sidebar flex flex-col relative z-50 h-full",
          // UX: Softer background, removed heavy shadow, subtle border
          "bg-transparent backdrop-blur-xl border-r border-neutral-200/60",
        )}
      >
        {/* UX IMPROVEMENT:
           Action buttons now only appear when hovering the sidebar (group-hover).
           This keeps the UI extremely clean when just reading/browsing.
        */}
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 z-100">
          <button
            onClick={handleResetWidth}
            title="Reset Width"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-200/50 transition-colors"
          >
            <ArrowsHorizontalIcon weight="bold" className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse Sidebar"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-200/50 transition-colors"
          >
            <CaretDoubleLeftIcon weight="bold" className="h-4 w-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex flex-col h-full overflow-hidden w-full">
          {/* User Profile */}
          <div className="p-3 pt-4 select-none">
            <UserItems />
          </div>

          {/* Create Button & Divider Area */}
          <div className="px-3 w-full flex flex-col gap-2">
            <div className="flex items-center justify-between group/add">
              <span className="text-xs font-semibold text-neutral-400 px-2 uppercase tracking-wider">
                Documents
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCreate}
                // UX: Cleaner, subtle button that aligns with text
                className="text-neutral-400 hover:text-neutral-800 p-1 rounded-md hover:bg-neutral-200/50 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="pb-1 px-2 opacity-50">
              <AnimatedLine />
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            <DocumentList />
          </div>

          {/* Footer */}
          <div className="p-3 flex items-center justify-between mt-auto border-t border-neutral-200/50">
            <Button
              onClick={() => setRoute("home")}
              variant="ghost" // UX: Ghost variant is less intrusive in sidebars
              size="sm"
              className=" justify-start gap-2 text-neutral-500 hover:text-neutral-900"
            >
              Home
            </Button>

            {/*Bottom*/}
            {pathname !== "/synapse" ? (
              <Link href={"/synapse"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-neutral-500 hover:text-neutral-900 bg-neutral-200/20 rounded-md"
                >
                  Colors :: <CornersOutIcon weight="bold" />
                </Button>
              </Link>
            ) : (
              <Link href={"/"} target="_blank" rel="noreferrer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-neutral-500 hover:text-neutral-900"
                >
                  <Home />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* UX IMPROVEMENT: Resize Handle
           Wider hit-area for mouse, but visually barely there.
           Highlights blue only when interacting.
        */}
        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={handleResetWidth}
          className={cn(
            "absolute top-0 -right-1 h-full w-2 cursor-col-resize z-50 transition-all",
            // Only show the blue line indicator on hover/active
            "hover:bg-blue-500/10 active:bg-blue-500/20",
            isResizing && "bg-blue-500/20",
          )}
        />
      </motion.aside>

      {/* Navbar / Main Content Area Adjustment */}
      <motion.div
        transition={
          isResizing
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 30 }
        }
        animate={{
          left: isCollapsed ? 0 : sidebarWidth,
          width: isCollapsed ? "100%" : `calc(100% - ${sidebarWidth}px)`,
        }}
        className="absolute top-0 h-full overflow-hidden pointer-events-none"
      >
        <nav className="p-3 w-fit flex items-center pointer-events-auto">
          <AnimatePresence>
            {isCollapsed && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={handleResetWidth}
                className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
