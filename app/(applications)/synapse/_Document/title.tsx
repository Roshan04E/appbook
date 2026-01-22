"use client";

import { useRef, useTransition, useEffect, useState } from "react";
import { Document } from "../types";
import { updateDocumentById } from "@/lib/database/tables/documents/action";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentStore } from "../store/useDocumentStore";
import { useTitleStore } from "../store/useTitleStore";

export default function BigTitle({ document }: { document: Document }) {
  const [_, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement>(null);

  const updateStore = useDocumentStore((s) => s.updateDocument);
  const { title, setTitle } = useTitleStore();

  // init title once
  useEffect(() => {
    setTitle(document.title);
  }, [document.title, setTitle]);

  const [editing, setEditing] = useState(false);

  const enable = () => {
    setEditing(true);
    requestAnimationFrame(() => {
      ref.current?.focus();
      ref.current?.select();
    });
  };

  const save = () => {
    setEditing(false);
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

  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.input
            key="edit"
            ref={ref}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
            className="w-full text-2xl font-bold outline-none bg-transparent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.h1
            key="view"
            onClick={enable}
            className="text-2xl font-bold cursor-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.85 }}
          >
            {title || "Untitled"}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
