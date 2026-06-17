"use client";
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import useDetectBrowser from "@/hooks/use-detect-browser"
import useScreenSize from "@/hooks/use-screen-size"
import GooeySvgFilter from "@/components/fancy/filter/gooey-svg-filter"

const TAB_CONTENT = [
  {
    title: "2024",
    files: [
      "learning-to-meditate.md",
      "spring-garden-plans.md",
      "travel-wishlist.md",
      "new-coding-projects.md",
    ],
  },
  {
    title: "2023",
    files: [
      "year-in-review.md",
      "marathon-training-log.md",
      "recipe-collection.md",
      "book-reflections.md",
    ],
  },
  {
    title: "2022",
    files: [
      "moving-to-a-new-city.md",
      "starting-a-blog.md",
      "photography-basics.md",
      "first-coding-project.md",
    ],
  },
  {
    title: "2021",
    files: [
      "goals-and-aspirations.md",
      "daily-gratitude.md",
      "learning-to-cook.md",
      "remote-work-journal.md",
    ],
  },
]

export default function GooeyDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const screenSize = useScreenSize()
  const browserName = useDetectBrowser()
  const isSafari = browserName === "Safari"

  return (
    <div className="relative w-full h-full flex justify-center p-2 md:p-8 font-calendas md:text-base text-xs sm:text-sm bg-transparent">
      <GooeySvgFilter
        id="gooey-filter"
        strength={screenSize.lessThan("md") ? 8 : 15}
      />

      <div className="w-full sm:w-11/12 md:w-4/5 relative mt-4 md:mt-16">
        <div
          className="absolute inset-0"
          style={{ filter: "url(#gooey-filter)" }}
        >
          <div className="flex w-full ">
            {TAB_CONTENT.map((_, index) => (
              <div key={index} className="relative flex-1 h-8 md:h-12">
                {activeTab === index && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-zinc-900 rounded-3xl"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Content panel */}
          <div className="w-full h-[180px] sm:h-[250px] md:h-[300px] bg-zinc-900 rounded-3xl overflow-hidden text-zinc-400">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="p-4 md:p-12"
              >
                <div className="space-y-1 mt-1 sm:mt-6 md:mt-8">
                  <ul className="">
                    {TAB_CONTENT[activeTab].files.map((file, index) => (
                      <li
                        key={file}
                        className="border-b border-zinc-800 pt-2 pb-2 text-zinc-200"
                      >
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive text overlay, no filter */}
        <div className="relative flex w-full ">
          {TAB_CONTENT.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="flex-1 h-8 md:h-12"
            >
              <span
                className={`
                w-full h-full flex items-center justify-center font-medium transition-colors
                ${activeTab === index ? "text-white" : "text-zinc-500"}
              `}
              >
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
