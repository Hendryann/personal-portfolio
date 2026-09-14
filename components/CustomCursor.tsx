"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-zinc-500 bg-zinc-500/20 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovered ? 18 : 12),
          y: mousePosition.y - (isHovered ? 18 : 12),
          width: isHovered ? 36 : 24,
          height: isHovered ? 36 : 24,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          mass: 0.08,
        }}
      />

      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-zinc-600 dark:bg-zinc-300"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          width: 6,
          height: 6,
        }}
      />
    </>
  );
}