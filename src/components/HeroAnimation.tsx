import React from "react";
import { motion } from "motion/react";

interface HeroAnimationProps {
  isDarkMode: boolean;
}

export default function HeroAnimation({ isDarkMode }: HeroAnimationProps) {
  // Exact text: "Welcome to V Astra AI by V Astra AI Studio"
  const text = "Welcome to V Astra AI by V Astra AI Studio";
  
  // We can segment the text to highlight "V Astra AI" and "V Astra AI Studio" in distinct beautiful gradients,
  // while ensuring we render the EXACT sequence character-by-character for fluid fluid-reveal.
  
  // To achieve Gemini-like fluid reveal, we will render each character as a motion.span
  // with a custom ease curve, staggered transition delay, and soft opacity + offset.
  const characters = Array.from(text);

  // Easing curve similar to Google's official fluid/liquid animation
  // (typically a very smooth cubic-bezier curve)
  const fluidTransition = {
    ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutQuint / easeOutExpo
    duration: 1.2,
  };

  return (
    <div className="text-center select-none" id="hero-heading-container">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-[1.15] py-2">
        {characters.map((char, index) => {
          // Determine if this character belongs to the brand names for specific styling
          // "Welcome to " (0 to 10)
          // "V Astra AI" (11 to 20)
          // " by " (21 to 24)
          // "V Astra AI Studio" (25 to 41)
          const isBrandPart1 = index >= 11 && index <= 20;
          const isBrandPart2 = index >= 25 && index <= 41;

          // Let's create a beautiful gradient style for the brand terms
          let charClass = "";
          if (isBrandPart1) {
            charClass = isDarkMode
              ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(168,85,247,0.2)]"
              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent";
          } else if (isBrandPart2) {
            charClass = isDarkMode
              ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(56,189,248,0.2)]"
              : "bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent";
          } else {
            charClass = isDarkMode ? "text-slate-100" : "text-slate-900";
          }

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                ...fluidTransition,
                delay: index * 0.035, // Stagger index delay
              }}
              className={`inline-block whitespace-pre ${charClass}`}
            >
              {char}
            </motion.span>
          );
        })}
      </h1>
    </div>
  );
}
