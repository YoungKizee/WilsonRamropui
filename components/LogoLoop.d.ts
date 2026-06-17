import React from 'react';

export interface LogoLoopProps {
  logos?: any[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  ariaLabel?: string;
  [key: string]: any;
}

declare const LogoLoop: React.FC<LogoLoopProps>;
export default LogoLoop;
