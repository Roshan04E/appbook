import { create } from "zustand";
import { RecursiveDocumentResponse } from "../types";

interface DocumentState {
  documents: RecursiveDocumentResponse[];
  setDocuments: (docs: RecursiveDocumentResponse[]) => void;
  addDocument: (doc: RecursiveDocumentResponse) => void;
  updateDocument: (updated: RecursiveDocumentResponse) => void;
  removeDocument: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],

  setDocuments: (docs) => set({ documents: docs }),

  addDocument: (doc) =>
    set((state) => {
      const insert = (
        nodes: RecursiveDocumentResponse[],
      ): RecursiveDocumentResponse[] =>
        nodes.map((n) => {
          if (n.id === doc.parent_document) {
            return { ...n, children: [...(n.children ?? []), doc] };
          }
          if (n.children?.length) {
            return { ...n, children: insert(n.children) };
          }
          return n;
        });

      if (!doc.parent_document) {
        return { documents: [doc, ...state.documents] };
      }

      return { documents: insert(state.documents) };
    }),

  updateDocument: (updated) =>
    set((state) => {
      const updateNodes = (
        nodes: RecursiveDocumentResponse[],
      ): RecursiveDocumentResponse[] =>
        nodes.map((n) => {
          if (n.id === updated.id) return { ...n, ...updated };
          if (n.children?.length)
            return { ...n, children: updateNodes(n.children) };
          return n;
        });

      return { documents: updateNodes(state.documents) };
    }),

  removeDocument: (id) =>
    set((state) => {
      const remove = (
        nodes: RecursiveDocumentResponse[],
      ): RecursiveDocumentResponse[] =>
        nodes
          .filter((n) => n.id !== id)
          .map((n) =>
            n.children ? { ...n, children: remove(n.children) } : n,
          );

      return { documents: remove(state.documents) };
    }),
}));
