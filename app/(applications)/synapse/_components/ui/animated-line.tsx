"use client";

import { motion } from "framer-motion";

export default function AnimatedLine() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-px w-full origin-left bg-black/10"
      />
    </div>
  );
}
