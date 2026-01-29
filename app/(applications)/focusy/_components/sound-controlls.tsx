"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause, Volume2, VolumeX, Square } from "lucide-react";

// ==================== SOUND CONTROLS ====================
const SoundControls = ({
  sound,
  setSound,
  soundEnabled,
  setSoundEnabled,
  previewing,
  togglePreview,
  audioRef,
  setPreviewing,
}: {
  sound: string;
  setSound: (s: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  previewing: boolean;
  togglePreview: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setPreviewing: (v: boolean) => void;
}) => {
  const handleVolumeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If sound is currently enabled and audio is playing (from preview OR timer), stop it
    if (soundEnabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPreviewing(false);
    }

    setSoundEnabled(!soundEnabled);
  };

  const handleStopAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPreviewing(false);
    }
  };

  // Check if audio is actually playing
  const isPlaying = audioRef.current && !audioRef.current.paused;

  return (
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
        <option value="/focusy/audios/lakshya-theme-bgm.mp3">
          🎯 Lakshya BGM
        </option>
      </select>

      <motion.button
        onClick={handleVolumeToggle}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
          soundEnabled
            ? "border border-orange-500 text-orange-400"
            : "bg-gray-300 text-gray-600"
        }`}
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          togglePreview();
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        disabled={!soundEnabled}
        className={`p-2 h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
          soundEnabled
            ? "border border-orange-500 text-orange-400 hover:bg-orange-50"
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

      {/* Stop button - shows when audio is playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleStopAudio}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 h-10 w-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Square size={14} fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoundControls;
