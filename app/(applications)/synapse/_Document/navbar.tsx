"use client";

import { useRef, useEffect, useTransition, useState } from "react";
import { Document } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  deleteDocument,
  updateDocumentById,
} from "@/lib/database/tables/documents/action";
import { useDocumentStore } from "../store/useDocumentStore";
import { motion, AnimatePresence } from "framer-motion";
import { DotsThreeIcon } from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useSynapse } from "../store/useSynapse";
import { useTitleStore } from "../store/useTitleStore";

const Navbar = ({ document }: { document: Document }) => {
  const { setSubRoute } = useSynapse();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const updateStore = useDocumentStore((s) => s.updateDocument);
  const { removeDocument } = useDocumentStore();

  const { title, setTitle } = useTitleStore();

  // sync initial
  useEffect(() => {
    setTitle(document.title);
  }, [document.title, setTitle]);

  const enable = () => {
    setIsEditing(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const save = () => {
    setIsEditing(false);
    if (title === document.title) return;

    startTransition(async () => {
      const { data } = await updateDocumentById(document.id, { title });

      updateStore({
        ...document,
        title: data.title,
      });

      setTitle(data.title);
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      const { success, message } = await deleteDocument(document.id);
      if (!success) {
        toast.error(message);
        return;
      }

      removeDocument(document.id);
      toast.success(message);
      setSubRoute("documents");
    });
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {!!document.icon && <span>{document.icon}</span>}

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div key="input">
            <Input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => e.key === "Enter" && save()}
              className="h-8 text-muted-foreground"
              disabled={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div key="btn">
            <Button
              variant="ghost"
              onClick={enable}
              className="text-muted-foreground hover:text-muted-foreground"
            >
              {title}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            onClick={(e) => e.stopPropagation()}
            className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700"
          >
            <DotsThreeIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="start" side="right">
          <DropdownMenuItem
            onClick={handleDelete}
            className="group/delete text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
