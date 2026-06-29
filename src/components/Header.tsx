import React from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md border-b ${
        isDarkMode
          ? "bg-slate-950/70 border-slate-900"
          : "bg-white/70 border-slate-250/30"
      }`}
      id="main-app-header"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 group" id="brand-logo-container">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight flex items-center gap-1.5">
              <span className={isDarkMode ? "text-white" : "text-slate-900"}>V Astra</span>
              <span className="text-xs px-1.5 py-0.5 rounded-md font-mono font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                AI
              </span>
            </span>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center" id="theme-toggle-container">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onToggleTheme}
            className={`relative p-2.5 rounded-xl border flex items-center justify-center transition-all ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-yellow-400 hover:text-yellow-300 hover:bg-slate-850"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle visual theme"
            id="theme-toggle-btn"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
