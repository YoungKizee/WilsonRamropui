"use client";

import React from "react";

interface GooeySvgFilterProps {
  id: string;
  strength?: number;
}

export default function GooeySvgFilter({ id, strength = 15 }: GooeySvgFilterProps) {
  return (
    <svg className="hidden">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}
