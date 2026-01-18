"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const quotes = [
  "Focus on what matters today.",
  "Small steps lead to big results.",
  "Consistency beats intensity.",
  "One task at a time, perfectly done.",
  "Progress, not perfection.",
  "Do it now. Sometimes 'later' becomes 'never'.",
  "Your future is created by what you do today.",
  "Clarity comes from engagement, not thought.",
  "Discipline is choosing between what you want now and what you want most.",
  "Action is the foundational key to success.",
  "The secret of getting ahead is getting started.",
  "Don’t count the days, make the days count.",
  "Simplicity is the ultimate sophistication.",
  "A year from now, you’ll wish you started today.",
  "Success is the sum of small efforts repeated daily.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Do the hard jobs first. Easy jobs will take care of themselves.",
  "Your mind is for having ideas, not holding them.",
  "Start where you are. Use what you have. Do what you can.",
  "Great things are done by a series of small things brought together.",
  "Don’t watch the clock; do what it does—keep going.",
  "The best way to get something done is to begin.",
  "Motivation gets you going, habit keeps you going.",
  "Don’t wait for opportunity. Create it.",
  "Progress, no matter how small, is still progress.",
  "Work smart, not just hard.",
  "Every accomplishment starts with the decision to try.",
  "Focus on being productive instead of busy.",
  "Your work is going to fill a large part of your life; do what you love.",
  "Do one thing at a time, and do it well.",
  "Don’t be busy, be productive.",
  "Energy flows where attention goes.",
  "Focus is the art of saying no.",
  "Don’t let perfect be the enemy of good.",
  "Make each day your masterpiece.",
  "Do what you can, with what you have, where you are.",
  "Be stubborn about your goals, flexible about your methods.",
  "The key is not to prioritize what’s on your schedule, but to schedule your priorities.",
  "Less talking, more doing.",
  "Start small, think big, move fast.",
  "Success doesn’t come to you—you go to it.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "The way to get started is to quit talking and begin doing.",
  "Focus on one thing until it’s done.",
  "Don’t just exist, live with purpose.",
  "Think like a proton—always positive.",
  "Great things never come from comfort zones.",
  "Discipline is doing what needs to be done, even if you don’t want to.",
  "Turn your cant’s into cans and your dreams into plans.",
  "Do what is right, not what is easy.",
];

export default function Header() {
  const { data: session } = useSession();
  // lazy initialization to pick random quote only once
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)],
  );

  return (
    <motion.div
      className=" w-full bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 text-white p-4 rounded-xl shadow-md text-center text-lg font-semibold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={quote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          &quot;Hey {session ? session?.user?.name?.split(" ")[0] : "Buddy"},{" "}
          {quote}&quot;
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
