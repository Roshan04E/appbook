import { create } from "zustand";

type TitleStore = {
  title: string;
  setTitle: (v: string) => void;
};

export const useTitleStore = create<TitleStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));
