"use client";
import React, { useMemo } from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { MapPin } from "lucide-react";
// @ts-ignore
import indiaMap from "@svg-maps/india";

export function AnimatedPinDemo() {
  // Manipur coordinates in the SVG viewBox space (approx)
  // Manipur is in the far northeast of India
  const manipurCenter = useMemo(() => {
    const mn = indiaMap.locations.find((l: { id: string }) => l.id === "mn");
    if (!mn) return { x: 530, y: 290 };
    // Parse the path to get approximate center
    const nums = mn.path.match(/[\d.]+/g);
    if (!nums || nums.length < 4) return { x: 530, y: 290 };
    const x = parseFloat(nums[0]);
    const y = parseFloat(nums[1]);
    return { x, y };
  }, []);

  return (
    <div className="h-[40rem] w-full flex items-center justify-center bg-transparent">
      <PinContainer
        title="Manipur, India"
        href="https://maps.google.com/?q=Manipur,India"
        pinClassName="translate-x-[55px] translate-y-[-15px]"
      >
        <div className="flex flex-col w-[20rem] h-[20rem] rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl overflow-hidden relative">
          {/* Top glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/30 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col flex-1 p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400/70 uppercase tracking-[0.3em] font-medium">Located</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">India</span>
            </div>

            {/* Map */}
            <div className="relative flex-1 mt-3 flex items-center justify-center overflow-hidden">
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

              {/* India SVG Map from @svg-maps/india */}
              <svg
                viewBox={indiaMap.viewBox}
                className="w-full h-full max-h-[170px] drop-shadow-[0_0_8px_rgba(255,255,255,0.04)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {indiaMap.locations.map((location: { id: string; name: string; path: string }) => (
                  <path
                    key={location.id}
                    d={location.path}
                    className={
                      location.id === "mn"
                        ? "fill-emerald-400/20 stroke-emerald-400/60"
                        : "fill-white/[0.03] stroke-white/[0.12]"
                    }
                    strokeWidth={location.id === "mn" ? "1.2" : "0.4"}
                  />
                ))}

                {/* Manipur pulsing marker */}
                <circle cx={manipurCenter.x} cy={manipurCenter.y} r="12" className="fill-emerald-400/[0.06]">
                  <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={manipurCenter.x} cy={manipurCenter.y} r="8" className="fill-emerald-400/[0.1]">
                  <animate attributeName="r" values="4;10;4" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx={manipurCenter.x} cy={manipurCenter.y} r="2.5" className="fill-emerald-400" />
              </svg>
            </div>

            {/* Info bar */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-[0.1em]">Lat</div>
                <div className="text-[11px] text-zinc-200 font-mono mt-0.5">24.82°N</div>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-[0.1em]">Long</div>
                <div className="text-[11px] text-zinc-200 font-mono mt-0.5">93.95°E</div>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-[0.1em]">Zone</div>
                <div className="text-[11px] text-zinc-200 font-mono mt-0.5">IST+5:30</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-2 pt-2.5 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400/60" />
                <span className="text-[11px] text-zinc-300">Manipur, India</span>
              </div>
              <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" />
                Online
              </div>
            </div>
          </div>

          {/* Bottom subtle glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </PinContainer>
    </div>
  );
}
export default AnimatedPinDemo;
