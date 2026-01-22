/* ---------------- DOCUMENT LIST ---------------- */

import { useParams, useRouter } from "next/navigation";
import { RecursiveDocumentResponse } from "../../../types";
import { useDocumentStore } from "../../../store/useDocumentStore";
import { useEffect, useState, useTransition } from "react";
import {
  createDocument,
  getDocumentTree,
} from "@/lib/database/tables/documents/action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Item from "./item";
import { useSynapse } from "../../../store/useSynapse";

interface Props {
  data?: RecursiveDocumentResponse[];
  level?: number;
}

export const DocumentList = ({ data, level = 0 }: Props) => {
  const params = useParams();
  const { openDocument } = useSynapse();

  const { documents, setDocuments, addDocument } = useDocumentStore();

  const list = data ?? documents;

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  /* Load once */
  useEffect(() => {
    if (documents.length) return;

    startTransition(async () => {
      const { success, data } = await getDocumentTree();
      if (!success || !data) return;

      const buildTree = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: any[],
        parent: string | null = null,
      ): RecursiveDocumentResponse[] =>
        items
          .filter((i) => i.parent_document === parent)
          .map((i) => ({
            ...i,
            children: buildTree(items, i.id),
          }));

      setDocuments(buildTree(data));
    });
  }, [documents.length, setDocuments]);

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const createChild = (parentId: string | null) => {
    startTransition(() => {
      (async () => {
        const { success, data, message } = await createDocument({
          title: "Untitled",
          parent_document: parentId,
          is_archived: false,
          is_published: false,
        });

        if (!success) {
          toast.error(message);
          return;
        }

        toast.success(message);
        addDocument({ ...data, children: [] });

        if (parentId) setExpanded((p) => ({ ...p, [parentId]: true }));
      })();
    });
  };

  return (
    <div className={cn(level === 0 && "max-h-96 ")}>
      {list.map((doc) => {
        const hasChildren = !!doc.children?.length;
        const isOpen = !!expanded[doc.id];

        return (
          <div key={doc.id} className="cursor-pointer">
            <Item
              id={doc.id}
              label={doc.title}
              documentIcon={doc.icon ?? undefined}
              level={level}
              active={params.documentId === doc.id}
              hasChildren={hasChildren}
              expanded={isOpen}
              onExpand={() => toggle(doc.id)}
              onClick={() => openDocument(doc.id)}
              onCreate={() => createChild(doc.id)}
            />

            {isOpen && hasChildren && (
              <DocumentList data={doc.children} level={level + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
};
