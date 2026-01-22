"use client";

import { getDocumentById } from "@/lib/database/tables/documents/action";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Document } from "../types";
import Navbar from "./navbar";
import { cn } from "@/lib/utils";
import Notes from "./notes";
import BigTitle from "./title";

const DocPage = ({
  id,
  isCollapsed,
}: {
  id: string | null;
  isCollapsed?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [document, setDocument] = useState<Document | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    startTransition(async () => {
      setDocument(null);
      setMessage("");
      const { success, data, message } = await getDocumentById(id);
      if (!success) {
        toast.error(message);
        setMessage(message);
        return;
      }
      toast.info(message);
      setDocument(data);
    });
  }, [id]);

  // If no id provided
  if (!id)
    return (
      <div className="flex items-center justify-center">
        No document selected
      </div>
    );

  // if currently loading the document from dtatabase...
  if (isPending)
    return <div className="flex items-center justify-center">Loading...</div>;

  // if document not found
  if (!document)
    return (
      <div className="flex items-center justify-center">
        Document Status :: {message}
      </div>
    );

  // final structure
  return (
    <div
      className={cn(
        "pl-13 pr-5 py-2 h-full w-full bg-white",
        !isCollapsed && "pl-5",
      )}
    >
      <Navbar document={document} />
      <BigTitle document={document} />
      <Notes document={document} />
    </div>
  );
};

export default DocPage;
