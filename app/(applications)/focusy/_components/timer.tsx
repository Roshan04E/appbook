import { motion, AnimatePresence } from "framer-motion";
import ProgressRing from "./progress-ring";
import AmbientMusicPlayer from "./ambient-music-player";

// ==================== TIMER DISPLAY ====================
const TimerDisplay = ({
  percentage,
  timeLeft,
  mode,
  running,
}: {
  percentage: number;
  timeLeft: number;
  mode: "work" | "break";
  running: boolean;
}) => {
  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-rows-4 items-center justify-center">
      <div className="row-span-3 pt-6 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: running ? [1, 1.01, 1] : 1 }}
          transition={{
            duration: 2,
            repeat: running ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <ProgressRing progress={percentage}>
            <motion.span
              className="text-4xl font-light text-gray-900 tabular-nums"
              key={timeLeft}
              initial={{ scale: 1.1, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {format(timeLeft)}
            </motion.span>
            <motion.span
              className="text-[10px] uppercase tracking-wider font-semibold mt-1"
              animate={{ color: mode === "work" ? "#f97316" : "#ec4899" }}
            >
              {mode === "work" ? "🔥 Focus" : "☕ Break"}
            </motion.span>
          </ProgressRing>
        </motion.div>

        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{
              scale: running ? [1, 1.2, 1] : 1,
              backgroundColor: running ? "#10b981" : "#94a3b8",
            }}
            transition={{ duration: 1, repeat: running ? Infinity : 0 }}
            className="w-2 h-2 rounded-full"
          />
          <span className="text-xs text-gray-600 font-medium">
            {running ? "Running" : "Paused"}
          </span>
        </motion.div>
      </div>
      <div>
        <AmbientMusicPlayer running={running} />
      </div>
    </div>
  );
};

export default TimerDisplay;
