"use client";

import { createContext, useContext, useRef, useState } from "react";

export type Win = {
  id: string;
  app: string;
  z: number;
  minimized: boolean;
};

type Ctx = {
  windows: Win[];
  appWindowRef: React.RefObject<HTMLDivElement | null>;
  open: (app: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  close: (id: string) => void;
};

const WindowContext = createContext<Ctx | null>(null);

const generateId = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<Win[]>([]);
  const appWindowRef = useRef<HTMLDivElement>(null);

  const open = (app: string) => {
    setWindows((w) => {
      const maxZ = Math.max(0, ...w.map((i) => i.z));
      return [
        ...w,
        {
          id: generateId(),
          app,
          z: maxZ + 1,
          minimized: false,
        },
      ];
    });
  };

  const focus = (id: string) => {
    setWindows((w) => {
      const maxZ = Math.max(0, ...w.map((i) => i.z));
      return w.map((win) => (win.id === id ? { ...win, z: maxZ + 1 } : win));
    });
  };

  const minimize = (id: string) => {
    setWindows((w) =>
      w.map((win) => (win.id === id ? { ...win, minimized: true } : win)),
    );
  };

  const restore = (id: string) => {
    setWindows((w) => {
      const maxZ = Math.max(0, ...w.map((i) => i.z));
      return w.map((win) =>
        win.id === id ? { ...win, minimized: false, z: maxZ + 1 } : win,
      );
    });
  };

  const close = (id: string) => {
    setWindows((w) => w.filter((i) => i.id !== id));
  };

  return (
    <WindowContext.Provider
      value={{ windows, appWindowRef, open, focus, minimize, restore, close }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("Wrap with WindowProvider");
  return ctx;
};
