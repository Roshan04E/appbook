"use client";

import { useState } from "react";

// ==================== STORE ====================
export const usePomodoro = () => {
  const [work, setWork] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [cycles, setCycles] = useState(0);
  const [sound, setSound] = useState("/focusy/audios/ring-cin.mp3");

  const toggle = () => setRunning(!running);
  const reset = () => setRunning(false);
  const switchMode = () => {
    if (mode === "work") {
      setCycles(cycles + 1);
      setMode("break");
    } else {
      setMode("work");
    }
    setRunning(false);
  };
  const setDuo = (w: number, b: number) => {
    setWork(w * 60);
    setBreakTime(b * 60);
    setRunning(false);
  };

  return {
    work,
    breakTime,
    running,
    mode,
    toggle,
    setDuo,
    reset,
    switchMode,
    cycles,
    sound,
    setSound,
  };
};
