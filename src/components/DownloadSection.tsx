import React, { useState } from "react";
import { Download, Monitor, Sparkles } from "lucide-react";
import MacDropdown from "./MacDropdown";
import { motion } from "motion/react";

interface DownloadSectionProps {
  onDownloadClick: () => void;
  onOpenWindowsModal: () => void;
  isDarkMode: boolean;
}

export default function DownloadSection({
  onDownloadClick,
  onOpenWindowsModal,
  isDarkMode,
}: DownloadSectionProps) {
  return (
    <div className="space-y-6 max-w-lg mx-auto" id="download-cards-container">
      {/* Button 1: Download from Google Play */}
      <motion.a
        href="https://play.google.com/store/apps/details?id=com.vastraai.app"
        onClick={onDownloadClick}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all duration-300 font-semibold group ${
          isDarkMode
            ? "bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 hover:border-purple-500/50 shadow-lg shadow-black/20"
            : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-500/50 shadow-md shadow-slate-100"
        }`}
        id="google-play-download-btn"
      >
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
            isDarkMode 
              ? "bg-slate-850 text-slate-200 group-hover:bg-slate-750 group-hover:text-white" 
              : "bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-black"
          }`}>
            {/* Custom Google Play SVG */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 5.27v13.46c0 .81.45 1.54 1.17 1.9l9.36-9.36L4.17 3.37c-.72.36-1.17 1.09-1.17 1.9zM19.83 10.1l-4.13-2.38-1.53 1.53 1.53 1.53 4.13-2.38c.67-.39.67-1.35 0-1.74zM14.63 11.27l-9.36 9.36 10.46-6.04c.67-.39.67-1.35 0-1.74l-1.1-1.58zM14.63 11.27L5.27 3.37l9.36 9.36.01.01z" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider font-bold opacity-60 font-mono">
              Mobile App
            </span>
            <span className="text-base font-display">Download from Google Play</span>
          </div>
        </div>
        <div className={isDarkMode ? "text-purple-400 group-hover:translate-x-1 transition-transform" : "text-blue-600 group-hover:translate-x-1 transition-transform"}>
          <Download className="h-5 w-5" />
        </div>
      </motion.a>

      {/* Button 2: Download for Windows */}
      <motion.button
        onClick={onOpenWindowsModal}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all duration-300 font-semibold group ${
          isDarkMode
            ? "bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 hover:border-purple-500/50 shadow-lg shadow-black/20"
            : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-500/50 shadow-md shadow-slate-100"
        }`}
        id="windows-download-btn"
      >
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
            isDarkMode 
              ? "bg-slate-850 text-slate-200 group-hover:bg-slate-750 group-hover:text-white" 
              : "bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-black"
          }`}>
            {/* Custom Windows SVG */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95V12.45z" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider font-bold opacity-60 font-mono">
              Desktop OS
            </span>
            <span className="text-base font-display">Download for Windows (Beta)</span>
          </div>
        </div>
        <div className={isDarkMode ? "text-purple-400 group-hover:translate-x-1 transition-transform" : "text-blue-600 group-hover:translate-x-1 transition-transform"}>
          <Download className="h-5 w-5" />
        </div>
      </motion.button>

      {/* Button 3: Download for Mac with Dropdown */}
      <MacDropdown onSelect={onDownloadClick} isDarkMode={isDarkMode} />
    </div>
  );
}
