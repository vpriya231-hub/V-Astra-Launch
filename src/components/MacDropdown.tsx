import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Cpu, Zap, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MacDropdownProps {
  onSelect: () => void;
  isDarkMode: boolean;
}

export default function MacDropdown({ onSelect, isDarkMode }: MacDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    onSelect();
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef} id="mac-dropdown-container">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all duration-300 font-semibold group ${
          isDarkMode
            ? "bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-100 hover:border-purple-500/50 shadow-lg shadow-black/20"
            : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 hover:border-blue-500/50 shadow-md shadow-slate-100"
        }`}
        id="mac-dropdown-trigger"
      >
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
            isDarkMode 
              ? "bg-slate-800 text-slate-200 group-hover:bg-slate-750 group-hover:text-white" 
              : "bg-slate-100 text-slate-700 group-hover:bg-slate-200 group-hover:text-black"
          }`}>
            {/* Official clean Apple solid icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider font-bold opacity-60 font-mono">
              Platform
            </span>
            <span className="text-base font-display">Download for MAC (Beta)</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={isDarkMode ? "text-slate-400" : "text-slate-500"}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 right-0 z-30 overflow-hidden rounded-2xl shadow-2xl border ${
              isDarkMode
                ? "bg-slate-950 border-slate-800 shadow-purple-500/5"
                : "bg-white border-slate-200 shadow-slate-300/40"
            }`}
            id="mac-dropdown-menu"
          >
            {/* Apple Silicon Option */}
            <a
              href="https://drive.google.com/uc?export=download&confirm=t&id=14b_qC88nfkf66IS8WaodwaPp2hOJ1Rco"
              onClick={handleLinkClick}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-3.5 p-4 transition-colors ${
                isDarkMode ? "hover:bg-slate-900 text-slate-100" : "hover:bg-slate-50 text-slate-900"
              }`}
              id="mac-apple-silicon"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 mt-0.5">
                <Cpu className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm font-display">Apple Silicon</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />
                </div>
                <p className={`text-xs mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  For M1, M2, M3 & newer Apple chips
                </p>
              </div>
            </a>

            <div className={`border-t ${isDarkMode ? "border-slate-850" : "border-slate-100"}`} />

            {/* Mac Intel Option */}
            <a
              href="https://drive.google.com/uc?export=download&confirm=t&id=1nQZHrfq8DAFSnV7NIgMWhm8llYC2Iwo1"
              onClick={handleLinkClick}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-3.5 p-4 transition-colors ${
                isDarkMode ? "hover:bg-slate-900 text-slate-100" : "hover:bg-slate-50 text-slate-900"
              }`}
              id="mac-intel"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm font-display">Intel Processor</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-40" />
                </div>
                <p className={`text-xs mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  For older Mac systems with Intel chips
                </p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
