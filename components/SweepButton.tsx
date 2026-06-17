"use client";

import React from "react";
import { motion } from "framer-motion";

interface SweepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SweepButton = ({ children = "GET MOTION+", className = "", ...props }: SweepButtonProps) => {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      className={`relative group flex items-center justify-center px-6 h-[44px] font-mono text-sm tracking-widest uppercase transition-all ${className}`}
      {...props}
    >
      {/* Background layer (clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0A0A0A]">
        {/* Hatched background */}
        <div 
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 5px)`
          }}
        />

        {/* Sweeping White Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Using aspect-square ensures the height matches the large width, so translating 100% pushes it completely out of the button bounds */}
          <div className="w-[250%] aspect-square rotate-45 transform origin-center">
            <div className="w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
        </div>
      </div>

      {/* Animated Corner Brackets (absolute so they span the very edges of the button) */}
      <motion.div
        variants={{
          idle: { top: 0, bottom: 0, left: 0, right: 0 },
          hover: { top: -4, bottom: -4, left: -4, right: -4 },
          tap: { top: 2, bottom: 2, left: 2, right: 2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute z-10 mix-blend-difference pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
      </motion.div>

      {/* Button Text */}
      <motion.span 
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.95 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative z-10 mix-blend-difference text-white font-bold flex items-center justify-center gap-2 whitespace-nowrap pointer-events-none"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
