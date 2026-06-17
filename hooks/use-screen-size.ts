"use client";

import { useState, useEffect } from "react";

export default function useScreenSize() {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    lessThan: (breakpoint: string) => {
      switch (breakpoint) {
        case "sm":
          return width < 640;
        case "md":
          return width < 768;
        case "lg":
          return width < 1024;
        case "xl":
          return width < 1280;
        case "2xl":
          return width < 1536;
        default:
          return false;
      }
    },
  };
}
