import React, { useState, useRef, useEffect } from "react";
import { Apple, ChevronDown, Cpu, Zap, ExternalLink } from "lucide-react";
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
            <Apple className="h-5 w-5" />
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
            {/* Intel Option */}
            <a
              href="https://drive.google.com/uc?id=14b_qC88nfkf66IS8WaodwaPp2hOJ1Rco"
              onClick={handleLinkClick}
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
              href="https://drive.google.com/uc?id=1nQZHrfq8DAFSnV7NIgMWhm8llYC2Iwo1"
              onClick={handleLinkClick}
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
