"use client";

import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { createDocument } from "@/lib/database/tables/documents/action";
import { toast } from "sonner";
import { useDocumentStore } from "../../../store/useDocumentStore";
import { useSynapse } from "../../../store/useSynapse";

const DocumentsPage = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { addDocument } = useDocumentStore();
  const { openDocument } = useSynapse();

  const onCreate = () => {
    startTransition(async () => {
      // call on createDocument
      const { success, message, data } = await createDocument({
        title: "Untitled",
        is_archived: false,
        is_published: false,
      });

      // handle error
      if (!success) {
        toast.error(message);
        return;
      }

      // present toast
      addDocument(data);
      openDocument(data.id);
      toast.success(message);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full flex items-center justify-center bg-[#FBFBFD]"
    >
      <div className="flex flex-col items-center text-center space-y-5">
        {/* Illustration */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Image
            src="/illustration.png"
            alt="empty"
            width={300}
            height={300}
            className="select-none drop-shadow-xl"
            priority
          />
        </motion.div>

        {/* Text */}
        <div className="space-y-1">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#1D1D1F]">
            Welcome {session?.user?.name?.split(" ")[0] || "User"}
          </h2>

          <p className="text-[#6E6E73] text-[15px] font-medium">
            Your ideas, organized and synced
          </p>
        </div>

        {/* Button */}
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
          <form action={onCreate}>
            <Button
              type="submit"
              disabled={isPending}
              className="
              bg-[#007AFF] hover:bg-[#0066D6]
              text-white font-medium
              rounded-lg px-5 py-5
              shadow-md
              transition-all
            "
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="h-4 w-4" />
              )}
              <span className="text-[14px]">New Document</span>
            </Button>
          </form>
        </motion.div>

        {/* Shortcut */}
        <p className="text-[11px] text-gray-400 font-medium">⌘ + N</p>
      </div>
    </motion.div>
  );
};

export default DocumentsPage;
