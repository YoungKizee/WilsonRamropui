"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionDevButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const MotionDevButton = ({ children = "GET MOTION+", className = "", ...props }: MotionDevButtonProps) => {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      className={`relative group flex items-center justify-center px-6 py-3 font-mono text-sm tracking-widest uppercase transition-colors ${className}`}
      {...props}
    >
      {/* Hatched/Striped Background Layer */}
      <div 
        className="absolute inset-0 opacity-[0.15] transition-opacity group-hover:opacity-[0.25]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)`
        }}
      />

      {/* The Animated Corner Brackets */}
      {/* We use framer-motion to expand/contract them on hover/tap */}
      <motion.div
        variants={{
          idle: { top: 0, bottom: 0, left: 0, right: 0 },
          hover: { top: -4, bottom: -4, left: -4, right: -4 },
          tap: { top: 2, bottom: 2, left: 2, right: 2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute pointer-events-none"
      >
        {/* Top-Left Bracket */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
        {/* Top-Right Bracket */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
        {/* Bottom-Left Bracket */}
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
      </motion.div>

      {/* Button Text */}
      <motion.span 
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.95 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative z-10 font-bold"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
