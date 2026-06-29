import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  hasDownloaded: boolean;
  isDarkMode: boolean;
}

export default function Footer({ hasDownloaded, isDarkMode }: FooterProps) {
  return (
    <footer
      className={`py-12 mt-16 border-t transition-colors duration-300 text-center ${
        isDarkMode
          ? "bg-slate-950/80 border-slate-900 text-slate-400"
          : "bg-slate-50 border-slate-200/50 text-slate-500"
      }`}
      id="main-app-footer"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
        {/* Privacy Policy and Support Links */}
        <div className="mb-1 flex items-center justify-center gap-4">
          <a
            href="https://sites.google.com/view/v-astra-ai/home"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-medium underline transition-all hover:opacity-100 ${
              isDarkMode ? "text-slate-400 hover:text-white opacity-80" : "text-slate-500 hover:text-slate-900 opacity-80"
            }`}
            id="privacy-policy-link"
          >
            Privacy Policy
          </a>
          <span className={`text-xs opacity-40 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>•</span>
          <a
            href="mailto:supportvastra@gmail.com"
            className={`text-xs font-medium underline transition-all hover:opacity-100 ${
              isDarkMode ? "text-slate-400 hover:text-white opacity-80" : "text-slate-500 hover:text-slate-900 opacity-80"
            }`}
            id="support-link"
          >
            Support
          </a>
        </div>

        {/* Animated Dynamic Message */}
        <div className="min-h-[40px] flex items-center justify-center font-display text-base font-semibold">
          <AnimatePresence mode="wait">
            {hasDownloaded ? (
              <motion.div
                key="downloaded-msg"
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-amber-500 font-bold text-lg drop-shadow-[0_2px_15px_rgba(239,68,68,0.15)] flex items-center justify-center gap-1.5"
                id="thank-you-downloaded"
              >
                ❤️ Thankyou for Downloading V Astra AI
              </motion.div>
            ) : (
              <motion.div
                key="default-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center justify-center gap-1.5 font-medium ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
                id="thank-you-default"
              >
                Thankyou!!! ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Studio Info / copyright */}
        <div className="text-xs opacity-60 font-sans tracking-wide">
          © {new Date().getFullYear()} V Astra AI Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
