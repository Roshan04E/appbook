"use client";
import { motion, AnimatePresence } from "framer-motion";

// ==================== CUSTOM SLIDERS ====================
const CustomSliders = ({
  work,
  breakTime,
  setDuo,
}: {
  work: number;
  breakTime: number;
  setDuo: (w: number, b: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="overflow-hidden"
  >
    <div className="p-3 bg-white/50 rounded-xl space-y-2">
      <div>
        <label className="text-[10px] font-medium text-gray-600 flex justify-between">
          <span>Work</span>
          <span className="text-orange-600">{Math.floor(work / 60)}m</span>
        </label>
        <input
          type="range"
          min={5}
          max={120}
          value={Math.floor(work / 60)}
          onChange={(e) => setDuo(+e.target.value, Math.floor(breakTime / 60))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>
      <div>
        <label className="text-[10px] font-medium text-gray-600 flex justify-between">
          <span>Break</span>
          <span className="text-pink-600">{Math.floor(breakTime / 60)}m</span>
        </label>
        <input
          type="range"
          min={1}
          max={60}
          value={Math.floor(breakTime / 60)}
          onChange={(e) => setDuo(Math.floor(work / 60), +e.target.value)}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>
    </div>
  </motion.div>
);

export default CustomSliders;
