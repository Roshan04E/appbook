"use client";

import { useState, useTransition } from "react";
import { Document } from "../types";
import Editor from "./editor";
import { updateDocumentById } from "@/lib/database/tables/documents/action";
import { Block } from "@blocknote/core";

const Notes = ({ document }: { document: Document }) => {
  const [_, startTransition] = useTransition();
  const [blocks, setBlocks] = useState<Block[]>([]);

  const onChange = (content: string) => {
    startTransition(async () => {
      await updateDocumentById(document.id, { content });
    });
  };

  return (
    <div className="w-4xl mx-auto">
      <div></div>
      <Editor
        onChange={onChange}
        initialContent={
          document.content ? JSON.parse(document.content) : undefined
        }
        blocks={blocks}
        setBlocks={setBlocks}
      />
    </div>
  );
};

export default Notes;
