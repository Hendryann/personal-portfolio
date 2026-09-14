"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2.0, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white px-6"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-black tracking-tighter"
        >
          HENDRI<span className="text-blue-600">.</span>
        </motion.h1>

        {/* Minimalist Loading Bar */}
        <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-blue-600 rounded-full absolute"
          />
        </div>
      </div>
    </motion.div>
  );
}