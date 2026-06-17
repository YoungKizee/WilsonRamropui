"use client";

import React, { useRef, useEffect } from "react";
import { Lock, Activity, Fingerprint } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface MetallicCardProps {
  name?: string;
  role?: string;
  idNumber?: string;
}

const chamferedPath = "M 24 0 L 336 0 L 360 24 L 360 544 L 336 568 L 24 568 L 0 544 L 0 24 Z";
const chamferedClipPath =
  "polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)";

// ─────────────────────────────────────────────────────────────────────────────
// SciFi Frame overlay (SVG — labels embedded so they scale perfectly)
// ─────────────────────────────────────────────────────────────────────────────
const SciFiFrame = () => (
  <div className="absolute inset-0 pointer-events-none z-20">
    <svg viewBox="0 0 360 568" className="absolute inset-0 w-full h-full" fill="none">
      {/* Outer chamfered border */}
      <path d={chamferedPath} stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" />
      {/* Inner chamfered border */}
      <path
        d="M 32 12 L 328 12 L 348 32 L 348 536 L 328 556 L 32 556 L 12 536 L 12 32 Z"
        stroke="rgba(255,255,255,0.18)" strokeWidth="1"
      />
      {/* Top accent trapezoid */}
      <path d="M 120 12 L 135 28 L 225 28 L 240 12"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
      {/* Bottom accent trapezoid */}
      <path d="M 100 556 L 120 532 L 240 532 L 260 556"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
      {/* Corner accent lines */}
      <path d="M 12 45 L 12 80"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 45 12 L 80 12"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 348 45 L 348 80"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 315 12 L 280 12"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 12 523 L 12 488"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 45 556 L 80 556"  stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 348 523 L 348 488" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      <path d="M 315 556 L 280 556" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
      {/* Labels — embedded in SVG so they scale perfectly on all screen sizes */}
      <text x="180" y="22" textAnchor="middle" fontFamily="monospace" fontSize="9"
        letterSpacing="3" fill="rgba(255,255,255,0.45)">#00001</text>
      <text x="180" y="551" textAnchor="middle" fontFamily="monospace" fontSize="10"
        fontWeight="bold" letterSpacing="4" fill="rgba(255,255,255,0.55)">3.472 WEHT</text>
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Solid SVG layer for card thickness / depth illusion
// ─────────────────────────────────────────────────────────────────────────────
const SvgLayer = ({
  fill,
  className,
  style,
}: {
  fill: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 360 568"
    preserveAspectRatio="none"
    className={`absolute inset-0 w-full h-full ${className ?? ""}`}
    style={style}
  >
    <path d={chamferedPath} fill={fill} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export const MetallicCard: React.FC<MetallicCardProps> = ({
  name = "ALEXANDER DOE",
  role = "SENIOR DEVELOPER",
  idNumber = "8901-2345-6789",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // This wrapper is a flat, non-3D div sized exactly to the card.
  // It sits on top of the 3D card and catches all touch events reliably.
  const touchOverlayRef = useRef<HTMLDivElement>(null);
  const lastTouchX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const y = useMotionValue(0);
  const rotationX = useMotionValue(0);

  // Smooth springs — slightly snappier so rotation feels physical
  const smoothY = useSpring(y, { stiffness: 100, damping: 28, mass: 0.9 });
  const smoothRotationX = useSpring(rotationX, { stiffness: 100, damping: 28, mass: 0.9 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(smoothRotationX, (v) => `${v}deg`);

  // Specular blob — ping-pongs left↔right as card rotates
  const specBlobX = useTransform(smoothRotationX, (v) => {
    const norm = ((v % 360) + 360) % 360;
    const pct = norm <= 180 ? (norm / 180) * 100 : ((360 - norm) / 180) * 100;
    return `${pct}%`;
  });
  const specBlobY = useTransform(smoothY, [-0.5, 0.5], ["15%", "85%"]);

  // Auto-animated shimmer angle (slow drift, gives life without interaction)
  const autoShimmer = useMotionValue(120);
  useEffect(() => {
    const ctrl = animate(autoShimmer, [120, 220, 120], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => ctrl.stop();
  }, [autoShimmer]);

  // Desktop mouse handler — only fires on real pointer devices
  useEffect(() => {
    const isMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isMouse) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      y.set(e.clientY / window.innerHeight - 0.5);
      rotationX.set(rotationX.get() + e.movementX * 0.3);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [y, rotationX]);

  // ── MOBILE TOUCH: Native non-passive listeners on the card-sized overlay ──
  // This is the ONLY way to guarantee touch interaction on real mobile devices:
  // 1. We attach to a FLAT, non-3D overlay div (no transform issues)
  // 2. We use { passive: false } so we CAN call preventDefault
  // 3. We call preventDefault on BOTH touchstart AND touchmove so the browser
  //    never gets a chance to claim the gesture for scrolling
  useEffect(() => {
    const overlay = touchOverlayRef.current;
    if (!overlay) return;

    // Always attach — desktop browsers never fire touch events anyway,
    // and some mobile devices falsely match "(hover: hover)" media query

    const handleTouchStart = (e: TouchEvent) => {
      // CRITICAL: preventDefault on touchstart tells the browser
      // "this element is handling the touch, do NOT scroll"
      e.preventDefault();
      e.stopPropagation();
      isDragging.current = true;
      lastTouchX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      e.stopPropagation();

      if (lastTouchX.current !== null) {
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - lastTouchX.current;
        rotationX.set(rotationX.get() + deltaX * 1.2);
        lastTouchX.current = currentX;
      }
      y.set(e.touches[0].clientY / window.innerHeight - 0.5);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      isDragging.current = false;
      lastTouchX.current = null;
    };

    // { passive: false } is ESSENTIAL — without it, Chrome on Android
    // silently ignores preventDefault() and scrolls the page anyway
    overlay.addEventListener("touchstart", handleTouchStart, { passive: false });
    overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
    overlay.addEventListener("touchend", handleTouchEnd, { passive: false });
    overlay.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      overlay.removeEventListener("touchstart", handleTouchStart);
      overlay.removeEventListener("touchmove", handleTouchMove);
      overlay.removeEventListener("touchend", handleTouchEnd);
      overlay.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [rotationX, y]);

  // ── Face styles — NO backdrop-filter (causes blink on 3D rotation) ──────
  // Instead we use a solid dark base + layered semi-transparent overlays
  // to simulate glass without any compositing artifacts.
  const faceBase: React.CSSProperties = {
    clipPath: chamferedClipPath,
    // Solid dark card base — matches the original dark metallic palette
    background: "linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 40%, #1e1e1e 70%, #2d2d2d 100%)",
    // Crisp top-edge highlight simulates glass rim without backdrop-filter
    boxShadow: `
      inset 0 2px 0 rgba(255,255,255,0.40),
      inset 0 -1px 0 rgba(255,255,255,0.05),
      inset 2px 0 0 rgba(255,255,255,0.08),
      inset -2px 0 0 rgba(255,255,255,0.03)
    `,
    // CRITICAL: both vendor prefixes needed to suppress flicker in Webkit
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden" as React.CSSProperties["backfaceVisibility"],
  };

  return (
    <div
      className="flex items-center justify-center p-8 w-full relative"
      style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
    >
      {/* ── Card-sized wrapper: positions the touch overlay exactly over the card ── */}
      <div className="relative w-full max-w-[360px] aspect-[1/1.58]">
        {/* ── Flat Touch Overlay ──
             This div is:
             - Sized EXACTLY to the card (not the whole page)
             - Completely flat (no 3D transforms) so mobile browsers always hit-test it
             - z-[100] so it sits above all 3D layers
             - touch-none + touchAction:none to tell the browser not to scroll
             Scrolling still works outside this card area!
        */}
        <div
          ref={touchOverlayRef}
          className="absolute inset-0 z-[100]"
          style={{
            touchAction: "none",
            // CRITICAL: Real mobile browsers skip truly transparent elements
            // during touch hit-testing. This near-invisible background
            // forces the browser to treat this as a real touchable surface.
            background: "rgba(0,0,0,0.001)",
            // Ensure WebKit treats this as a real layer
            WebkitTapHighlightColor: "transparent",
          }}
        />

        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="absolute inset-0 select-none pointer-events-none"
        >
          {/* ── Drop shadows (Front & Back to prevent bleed-through when flipped) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "translateZ(-20px) scale(1.04) translateY(12px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <SvgLayer fill="rgba(0,0,0,0.75)" className="blur-xl" />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "rotateY(180deg) translateZ(-20px) scale(1.04) translateY(12px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <SvgLayer fill="rgba(0,0,0,0.75)" className="blur-xl" />
          </div>

          {/* ── Edge / thickness layers ── */}
          {/* More layers, wider z-spread = visible physical depth at 90° */}
          {[...Array(8)].map((_, i) => {
            const z = (i / 7) * 10 - 5; // -5px → +5px
            // Edge layers slightly lighter so the side is visible during rotation
            const brightness = i < 2 || i > 5 ? 0.55 : 0.35;
            return (
              <SvgLayer
                key={i}
                fill={`rgba(${Math.round(brightness * 255)}, ${Math.round(brightness * 255)}, ${Math.round(brightness * 255)}, 0.95)`}
                style={{ transform: `translateZ(${z}px)` }}
              />
            );
          })}

          {/* ════════════════════════════════════════════════════════════
              FRONT FACE
          ════════════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden"
            style={{
              ...faceBase,
              transform: "translateZ(6px)",
            }}
          >
            <SciFiFrame />

            {/* Glass sheen overlay — pure CSS, zero compositing cost */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)",
              }}
            />

            {/* Dynamic specular blob (soft radial, follows tilt smoothly) */}
            <motion.div
              className="absolute w-64 h-64 rounded-full pointer-events-none"
              style={{
                left: specBlobX,
                top: specBlobY,
                x: "-50%",
                y: "-50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />

            {/* Slow caustic shimmer (no sharp edges — very wide transitions) */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: useTransform(
                  autoShimmer,
                  (a) =>
                    `linear-gradient(${a}deg, transparent 20%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 60%, transparent 80%)`
                ),
              }}
            />

            {/* Vignette inner shadow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.70)" }}
            />

            {/* ═══ CONTENT ═══ */}
            <div className="relative z-10 flex flex-col h-full justify-between p-5 sm:p-8 pt-10 sm:pt-12">
              {/* Top */}
              <div>
                <div className="flex justify-between items-center w-full mb-4 sm:mb-6 mt-2 sm:mt-4">
                  {/* SECURE badge — NO backdrop-blur (causes flicker in 3D context) */}
                  <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded border border-zinc-500/50 bg-zinc-800/60 text-[9px] sm:text-[10px] font-bold text-zinc-300 tracking-wider">
                    <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    SECURE
                  </div>
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                </div>
              </div>

              {/* Middle */}
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-[20px] sm:text-[28px] leading-tight font-bold text-white tracking-widest text-center mb-2 sm:mb-3 break-words w-full px-1">
                  {name}
                </h2>
                <p className="text-zinc-400 text-[10px] sm:text-xs tracking-[0.20em] sm:tracking-[0.25em] font-medium text-center uppercase">
                  {role}
                </p>
              </div>

              {/* Bottom */}
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between items-end w-full">
                  <div>
                    <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase mb-1 sm:mb-1.5">
                      ID NUMBER
                    </p>
                    <p className="text-zinc-200 font-mono text-[11px] sm:text-sm tracking-wider font-semibold">
                      {idNumber}
                    </p>
                  </div>
                  <Fingerprint className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 opacity-80" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              BACK FACE
          ════════════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              ...faceBase,
              background: "linear-gradient(215deg, #3a3a3a 0%, #2a2a2a 40%, #1e1e1e 70%, #2d2d2d 100%)",
              transform: "rotateY(180deg) translateZ(6px)",
            }}
          >
            <SciFiFrame />

            {/* Glass sheen overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(200deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.10) 100%)",
              }}
            />

            {/* Specular blob on back too */}
            <motion.div
              className="absolute w-64 h-64 rounded-full pointer-events-none"
              style={{
                left: specBlobX,
                top: specBlobY,
                x: "-50%",
                y: "-50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />

            {/* Slow caustic shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: useTransform(
                  autoShimmer,
                  (a) =>
                    `linear-gradient(${a + 30}deg, transparent 20%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 60%, transparent 80%)`
                ),
              }}
            />

            {/* Vignette — matching the front */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.70)" }}
            />

            {/* Back content — high opacity to match front face brightness */}
            <div className="relative z-10 flex flex-col items-center justify-center" style={{ opacity: 0.85 }}>
              <Lock className="w-16 h-16 text-white mb-4" />
              <p className="text-white text-sm tracking-[0.3em] font-bold">AUTHORIZED</p>
              <p className="text-white text-sm tracking-[0.3em] font-bold">PERSONNEL</p>
              <p className="text-white text-sm tracking-[0.3em] font-bold">ONLY</p>
            </div>
          </div>

          {/* ── Outer border ring (chamfered, no clip-path on a 3D child) ── */}
          <SvgLayer
            fill="none"
            className="pointer-events-none"
            style={{
              transform: "translateZ(7px)",
              // Use SVG stroke via filter trick — actual border drawn by SciFiFrame
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
