import React from "react";
import { AnimatedStrokeText } from "./AnimatedStrokeText";

export function AnimatedStrokeTextDemo() {
  return (
    <div className="flex w-full items-center justify-center bg-black min-h-[400px]">
      <AnimatedStrokeText 
        text="AMIINE" 
        className="text-white" 
      />
    </div>
  );
}
