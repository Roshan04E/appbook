import { motion, AnimatePresence } from "framer-motion";

// ==================== PRESET BUTTONS ====================
const PresetButtons = ({
  work,
  setDuo,
  showCustom,
  setShowCustom,
}: {
  work: number;
  setDuo: (w: number, b: number) => void;
  showCustom: boolean;
  setShowCustom: (v: boolean) => void;
}) => (
  <div className="flex items-center gap-2 flex-wrap">
    {[
      { label: "25/5", w: 25, b: 5 },
      { label: "50/10", w: 50, b: 10 },
      { label: "60/15", w: 60, b: 15 },
    ].map((p) => (
      <motion.button
        key={p.label}
        onClick={() => setDuo(p.w, p.b)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
          work === p.w * 60
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
            : "bg-white/50 text-gray-700 hover:bg-white/70"
        }`}
      >
        {p.label}
      </motion.button>
    ))}
    <motion.button
      onClick={() => setShowCustom(!showCustom)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
        showCustom
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
          : "bg-white/50 text-gray-700 hover:bg-white/70"
      }`}
    >
      Custom
    </motion.button>
  </div>
);

export default PresetButtons;
