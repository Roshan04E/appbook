"use client";

import { useEffect, useRef, useState } from "react";
import { usePomodoro } from "./store/usePomodoro";
import { motion, AnimatePresence } from "framer-motion";
import PresetButtons from "./_components/preset-buttons";
import CustomSliders from "./_components/custom-sliders";
import { Coffee, Pause, Play, RotateCcw, Volume2, Zap } from "lucide-react";
import SoundControls from "./_components/sound-controlls";
import TimerDisplay from "./_components/timer";

// ==================== MAIN APP ====================
export default function FocusyApp() {
  const {
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
  } = usePomodoro();

  const [timeLeft, setTimeLeft] = useState(work);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [previewing, setPreviewing] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const totalTime = mode === "work" ? work : breakTime;
  const percentage = (timeLeft / totalTime) * 100;

  useEffect(() => {
    setTimeLeft(mode === "work" ? work : breakTime);
  }, [work, breakTime, mode]);

  const playSound = () => {
    if (!audioRef.current || !soundEnabled) return;
    audioRef.current.load();
    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          if (soundEnabled) playSound();
          navigator.vibrate?.(400);
          if (Notification.permission === "granted") {
            new Notification(
              mode === "work" ? "Time for break! ☕" : "Back to work! 💪",
            );
          }
          switchMode();
          return mode === "work" ? breakTime : work;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, mode, work, breakTime, soundEnabled]);

  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);

  const togglePreview = () => {
    if (!audioRef.current || !soundEnabled) return;
    if (previewing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPreviewing(false);
    } else {
      playSound();
      setPreviewing(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => setPreviewing(false);
    audioRef.current.addEventListener("ended", handleEnded);
    return () => audioRef.current?.removeEventListener("ended", handleEnded);
  }, []);

  const handleReset = () => {
    reset();
    setTimeLeft(mode === "work" ? work : breakTime);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full p-4 @container"
      >
        <audio ref={audioRef}>
          <source src={sound} type="audio/mpeg" />
        </audio>

        <div className="grid @md:grid-cols-2 gap-4 h-full">
          {/* LEFT - Settings */}
          <div className="rounded-2xl p-4 bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl space-y-4 overflow-hidden overflow-y-auto custom-scrollbar">
            <motion.div
              className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="flex items-center gap-2">
              <Zap className="text-orange-500" size={18} />
              <h2 className="text-base font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Settings
              </h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Quick Presets
              </label>
              <PresetButtons
                work={work}
                setDuo={setDuo}
                showCustom={showCustom}
                setShowCustom={setShowCustom}
              />
            </div>

            <AnimatePresence>
              {showCustom && (
                <CustomSliders
                  work={work}
                  breakTime={breakTime}
                  setDuo={setDuo}
                />
              )}
            </AnimatePresence>

            <motion.div
              className="p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">
                  Cycles
                </span>
                <motion.span
                  key={cycles}
                  initial={{ scale: 1.5, color: "#ea580c" }}
                  animate={{ scale: 1, color: "#f97316" }}
                  className="text-xl font-bold text-orange-500"
                >
                  {cycles}
                </motion.span>
              </div>
            </motion.div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <Volume2 size={12} />
                Sound
              </label>
              <SoundControls
                sound={sound}
                setSound={setSound}
                soundEnabled={soundEnabled}
                setSoundEnabled={setSoundEnabled}
                previewing={previewing}
                togglePreview={togglePreview}
              />
            </div>

            <div className="pt-10 flex items-center justify-center gap-4">
              {/* RESET */}
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-2 h-10 w-10 bg-gradient-to-r from-orange-300 to-orange-500 text-white flex items-center justify-center rounded-full"
              >
                <RotateCcw size={14} />
              </motion.button>

              {/* PLAY / PAUSE */}
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-2 h-15 w-15 bg-gradient-to-r from-orange-500 to-orange-600 text-white border border-orange-400 flex items-center justify-center rounded-full"
              >
                {running ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              {/* BREAK */}
              <motion.button
                onClick={switchMode}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-2 h-10 w-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center rounded-full"
              >
                <Coffee size={14} />
              </motion.button>
            </div>
          </div>

          {/* RIGHT - Timer */}
          <div className="rounded-2xl p-4 bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-pink-200/20 to-purple-200/20 pointer-events-none"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <TimerDisplay
              percentage={percentage}
              timeLeft={timeLeft}
              mode={mode}
              running={running}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
