"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-12 grid-rows-2 gap-1 sm:gap-2 lg:gap-4 w-full">
      <GridItem
        area="[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
      />

      <GridItem
        area="[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
      />

      <GridItem
        area="[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
      />

      <GridItem
        area="[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[8rem] sm:min-h-[10rem] md:min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-xl border p-1 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-1 md:gap-6 overflow-hidden rounded-lg p-2 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-1 md:gap-3">
            <div className="w-fit rounded-md border border-gray-600 p-1 md:p-2">
              {icon}
            </div>
            <div className="space-y-0.5 md:space-y-3">
              <h3 className="-tracking-4 font-sans text-[11px] sm:text-xs font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white leading-[1.2]">
                {title}
              </h3>
              <h2 className="font-sans text-[9px] sm:text-[10px] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold leading-[1.2]">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
