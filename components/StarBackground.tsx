"use client";

import { motion } from "framer-motion";

export default function StarBackground() {
  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    top: `${(i * 17) % 100}%`,
    left: `${(i * 29) % 100}%`,
    size: (i % 3) + 1,
    duration: 2 + (i % 4),
    delay: (i % 6) * 0.35,
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