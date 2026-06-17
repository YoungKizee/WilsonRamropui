"use client";

import React from "react";
import Link from "next/link";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandInstagram
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-zinc-950 pt-10 pb-0 px-4 md:pt-16 md:pb-0 md:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Section */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
          <div className="bg-white p-1 md:p-1.5 rounded-md md:rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H7L12 12L17 22H22L12 2Z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg md:text-xl tracking-wide">DevStudio</span>
        </div>

        {/* Links */}
        <div className="flex flex-row justify-center items-center flex-nowrap gap-x-2 md:gap-x-8 text-[9px] sm:text-xs md:text-sm text-zinc-300 mb-3 md:mb-4 w-full max-w-full">
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Products</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Studio</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Clients</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Blog</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors whitespace-nowrap">Terms</Link>
        </div>

        {/* Dashed Separator */}
        <div
          className="w-full border-t border-dashed border-zinc-700 mb-6 md:mb-8"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        />

        {/* Bottom Section */}
        <div className="w-full flex flex-row flex-nowrap justify-between items-center text-zinc-400 gap-2 -mb-1.5 md:-mb-4">
          <HoverBorderGradient
            containerClassName="rounded-full shrink-0"
            as="div"
            className="dark:bg-zinc-950 bg-white text-black dark:text-white flex items-center justify-center space-x-1 md:space-x-2 px-2 py-1 md:px-4 md:py-1.5"
          >
            <span className="text-[8px] sm:text-[10px] md:text-sm whitespace-nowrap">© {new Date().getFullYear()} Wilson Ramropui</span>
          </HoverBorderGradient>
          <div className="flex flex-row items-center gap-1.5 md:gap-5 shrink-0">
            <Link href="#" className="hover:text-white transition-colors"><IconBrandTwitter className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[1.5]" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><IconBrandLinkedin className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[1.5]" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><IconBrandGithub className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[1.5]" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><IconBrandFacebook className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[1.5]" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><IconBrandInstagram className="w-3.5 h-3.5 md:w-5 md:h-5 stroke-[1.5]" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
