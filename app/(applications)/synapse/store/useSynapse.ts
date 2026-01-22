import { create } from "zustand";

type SynapseState = {
  route: "home" | "dashboard";
  subRoute: "documents" | "tasks" | "settings" | "document";
  docId: string | null;

  setRoute: (r: "home" | "dashboard") => void;
  setSubRoute: (sr: "documents" | "tasks" | "settings") => void;
  openDocument: (id: string | null) => void;
};

export const useSynapse = create<SynapseState>((set) => ({
  route: "dashboard",
  subRoute: "documents",
  docId: null,

  setRoute: (r) => set({ route: r }),
  setSubRoute: (sr) => set({ subRoute: sr }),
  openDocument: (id) => {
    set({ subRoute: "document", docId: id });
  },
}));
