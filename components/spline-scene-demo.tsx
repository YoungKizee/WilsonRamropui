'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(255,255,255,0.04)] transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:border-white/[0.12]">
      {/* Top glass reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
      {/* Bottom subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-20" />
      {/* Inner ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40 pointer-events-none z-10" />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
          <span className="text-[11px] text-zinc-500 uppercase tracking-[0.25em] font-medium mb-4">Interactive Experience</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Interactive 3D
          </h1>
          <p className="mt-4 text-neutral-400 max-w-lg leading-relaxed text-sm md:text-base">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
