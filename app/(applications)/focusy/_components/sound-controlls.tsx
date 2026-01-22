"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

// ==================== SOUND CONTROLS ====================
const SoundControls = ({
  sound,
  setSound,
  soundEnabled,
  setSoundEnabled,
  previewing,
  togglePreview,
}: {
  sound: string;
  setSound: (s: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  previewing: boolean;
  togglePreview: () => void;
}) => (
  <div className="flex gap-2">
    <select
      value={sound}
      onChange={(e) => setSound(e.target.value)}
      className="flex-1 p-2 rounded-lg bg-white/60 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
    >
      <option value="/focusy/audios/ring-cin.mp3">🎬 Cinematic</option>
      <option value="/focusy/audios/ring-interstellar.mp3">
        🌌 Interstellar
      </option>
    </select>
    <motion.button
      onClick={() => setSoundEnabled(!soundEnabled)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
        soundEnabled
          ? "border border-orange-500 text-orange-400"
          : "bg-gray-300 text-gray-600"
      }`}
    >
      {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </motion.button>
    <motion.button
      onClick={togglePreview}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      disabled={!soundEnabled}
      className={`p-2 h-10 w-10 flex items-center justify-center rounded-full  transition-colors ${
        soundEnabled
          ? "border border-orange-500 text-orange-400"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={previewing ? "pause" : "play"}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {previewing ? <Pause size={14} /> : <Music2 size={14} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  </div>
);

export default SoundControls;
