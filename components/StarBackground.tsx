"use client";

import { motion } from "framer-motion";

export default function StarBackground() {
  // Generate posisi acak untuk bintang
  const stars = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1, // 1px - 3px
    duration: Math.random() * 3 + 2, // 2s - 5s
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.1, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          className="absolute bg-white rounded-full shadow-[0_0_6px_#fff]"
        />
      ))}
    </div>
  );
}