"use client";

import {
  SparkleIcon,
  PaperPlaneRightIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Footer from "./footer";
import { useSynapse } from "../../store/useSynapse";

const HeroSection = () => {
  const { setRoute } = useSynapse();
  return (
    <>
      <div className="relative w-full h-screen bg-gradient-to-br from-gray-50 to-white flex pt-10 justify-center overflow-hidden px-6">
        {/* Soft Gradient Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px]" />
        </div>

        {/* Main Card */}
        <motion.div
          className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* macOS Title Bar */}
          <div className="h-10 flex items-center px-4 border-b border-gray-200/40 bg-white/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm flex items-center justify-center gap-1">
              <NotePencilIcon size={14} /> Synapse
            </div>
          </div>

          {/* Content */}
          <div className="p-12 md:p-20 flex flex-col items-start max-w-2xl">
            <motion.div
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SparkleIcon weight="fill" size={16} />
              AI Workspace
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Organize your ideas. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Welcome to Synapse
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-500 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Minimal, fast, and collaborative workspace for your team.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Primary Button: macOS Action Blue */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative group px-8 py-3.5 rounded-2xl font-medium text-white
                         bg-gradient-to-b from-blue-500 to-blue-600
                         shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(37,99,235,0.25)]
                         border border-blue-700/50 flex items-center gap-2.5 transition-shadow duration-300"
                onClick={() => setRoute("dashboard")}
              >
                <span className="relative z-10">Get Started</span>
                <PaperPlaneRightIcon
                  weight="bold"
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
                {/* Subtle Shine Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              {/* Secondary Button: macOS Glass/Sidebar Style */}
              {/*<motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(243, 244, 246, 1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-2xl font-medium text-gray-700
                         bg-white/80 backdrop-blur-md
                         border border-gray-200/80
                         shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                         flex items-center gap-2 transition-all duration-200"
              >
                Request Demo
              </motion.button>*/}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default HeroSection;
