"use client";

import {
  Block,
  PartialBlock,
  defaultBlockSpecs,
  defaultStyleSpecs,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent: PartialBlock[] | undefined;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export default function Editor({
  onChange,
  initialContent,
  blocks,
  setBlocks,
}: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
    defaultBlockSpecs,
    defaultStyleSpecs,
  });

  // Sync editor state to parent blocks once
  useEffect(() => {
    setBlocks(editor.document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full relative">
      <BlockNoteView
        editor={editor}
        theme="light"
        formattingToolbar={true}
        popoverTarget="body" // important: popovers render to body, avoids clipping
        onChange={() => {
          const data = editor.document;
          setBlocks(data);
          onChange(JSON.stringify(data, null, 2));
        }}
      ></BlockNoteView>
    </div>
  );
}
