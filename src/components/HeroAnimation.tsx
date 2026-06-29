import React from "react";
import { motion } from "motion/react";

interface HeroAnimationProps {
  isDarkMode: boolean;
}

export default function HeroAnimation({ isDarkMode }: HeroAnimationProps) {
  // Exact phrase: "Welcome to V Astra AI by V Astra AI Studio"
  const text = "Welcome to V Astra AI by V Astra AI Studio";
  const characters = Array.from(text);

  // Custom motion transitions for premium, satisfyingly steady letter reveal
  const charTransition = (index: number) => ({
    ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutExpo cubic bezier
    duration: 1.4,
    delay: index * 0.055, // 55ms steady delay per letter for a very smooth typing/fade flow
  });

  return (
    <div className="text-center select-none py-4" id="hero-heading-container">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-tight py-2 flex flex-wrap justify-center max-w-4xl mx-auto">
        {characters.map((char, index) => {
          // Identify brand segments for coloring
          // "V Astra AI" is indices 11 to 20
          // "V Astra AI Studio" is indices 25 to 41
          const isBrandPrimary = index >= 11 && index <= 20;
          const isBrandSecondary = index >= 25 && index <= 41;

          let charClass = "";
          if (isBrandPrimary) {
            charClass = isDarkMode
              ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(168,85,247,0.25)] font-extrabold"
              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold";
          } else if (isBrandSecondary) {
            charClass = isDarkMode
              ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.25)] font-extrabold"
              : "bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent font-extrabold";
          } else {
            charClass = isDarkMode ? "text-slate-100 font-bold" : "text-slate-900 font-bold";
          }

          // Use \u00A0 for spaces to prevent collapsing in flex layout, with custom width
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={charTransition(index)}
              className={`inline-block ${charClass} ${char === " " ? "w-[0.25em]" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </h1>

      {/* Elegant Gemini-like sliding color line decoration below heading */}
      <div className="max-w-xs mx-auto mt-6 h-1 relative overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.8, duration: 2.0, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${
            isDarkMode
              ? "from-violet-500 via-fuchsia-500 to-cyan-400"
              : "from-indigo-500 via-purple-500 to-pink-500"
          }`}
        />
      </div>
    </div>
  );
}
