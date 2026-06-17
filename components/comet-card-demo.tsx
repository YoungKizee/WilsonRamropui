import { CometCard } from "@/components/ui/comet-card";
import { Mail, MapPin, Globe, Phone, ArrowUpRight } from "lucide-react";

export default function CometCardDemo() {
  return (
    <CometCard>
      <div
        className="my-10 flex w-[340px] md:w-[380px] cursor-pointer flex-col items-stretch rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl overflow-hidden transition-all duration-700 md:my-20"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        {/* Image section */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            alt="Wilson Ramropui Background"
            src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Top glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400/80 uppercase tracking-[0.3em] font-medium">Available</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-wider uppercase">
              Wilson Ramropui
            </h3>
            
            <p className="text-[11px] text-zinc-400 mt-1.5 tracking-[0.2em] uppercase font-medium">
              Full-Stack AI Builder
            </p>

            {/* Accent line */}
            <div className="w-8 h-px bg-gradient-to-r from-white/40 to-transparent mt-5 mb-5" />
            
            {/* Info items */}
            <div className="flex flex-col gap-3 text-[12px] text-zinc-400">
              <div className="flex items-center gap-2.5 group">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-zinc-200 transition-colors">Guwahati, Assam</span>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Globe className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-zinc-200 transition-colors">wilsonramropui.com</span>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Phone className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-zinc-200 transition-colors">+91 123 456 7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-7 py-4 border-t border-white/[0.06] bg-white/[0.01]">
          <div className="flex items-center gap-2.5 text-[12px] text-zinc-400">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <span>hello@example.com</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold uppercase tracking-[0.15em]">
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </CometCard>
  );
}
