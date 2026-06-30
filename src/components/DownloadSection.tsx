import React from "react";
import { Download, Cpu, Zap, ExternalLink } from "lucide-react";
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
  // Common glassmorphic container style (Liquid Glass)
  const getCardClasses = () => {
    return `relative overflow-hidden p-6 rounded-3xl border flex flex-col justify-between h-[230px] transition-all duration-500 group backdrop-blur-xl ${
      isDarkMode
        ? "bg-slate-950/45 border-slate-800/80 hover:border-purple-500/40 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] hover:shadow-purple-500/5 hover:-translate-y-1"
        : "bg-white/45 border-slate-200/80 hover:border-blue-500/40 shadow-[0_15px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-blue-500/5 hover:-translate-y-1"
    }`;
  };

  const getIconWrapperClasses = () => {
    return `p-3 rounded-2xl flex items-center justify-center transition-colors shrink-0 w-12 h-12 ${
      isDarkMode 
        ? "bg-slate-900/80 text-slate-100 group-hover:bg-slate-850" 
        : "bg-slate-100/80 text-slate-900 group-hover:bg-slate-200"
    }`;
  };

  const getActionTextClasses = () => {
    return `mt-4 inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider transition-transform duration-300 ${
      isDarkMode
        ? "text-purple-400 group-hover:text-purple-300"
        : "text-blue-600 group-hover:text-blue-700"
    }`;
  };

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full" 
      id="download-cards-grid"
    >
      {/* Box 1: Google Play Store */}
      <motion.a
        href="https://play.google.com/store/apps/details?id=com.vastraai.app"
        onClick={onDownloadClick}
        target="_blank"
        rel="noopener noreferrer"
        className={getCardClasses()}
        id="google-play-download-btn"
      >
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={getIconWrapperClasses()}>
              {/* Custom Google Play SVG with official full-colored branding */}
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3.609 1.814C3.213 2.193 3 2.782 3 3.535v16.93c0 .753.213 1.342.609 1.721L12.566 12 3.609 1.814z"
                  fill="#00C3FF"
                />
                <path
                  d="M16.514 15.541l-3.948-3.541 3.948-3.541 4.545 2.624c1.1.635 1.1 1.666 0 2.301l-4.545 2.624z"
                  fill="#FFD600"
                />
                <path
                  d="M12.566 12L3.609 21.186c.394.375.992.355 1.656-.027l12.249-7.078-4.948-2.081z"
                  fill="#00E676"
                />
                <path
                  d="M12.566 12l4.948-2.081-12.249-7.078C4.601 2.46 4.003 2.44 3.609 2.815L12.566 12z"
                  fill="#FF3366"
                />
              </svg>
            </div>
            <ExternalLink className={`h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
          </div>

          <div className="space-y-1.5">
            <span className={`block text-[10px] uppercase tracking-wider font-bold font-mono opacity-60 ${isDarkMode ? "text-purple-300" : "text-blue-600"}`}>
              Mobile Client
            </span>
            <h3 className="text-base font-bold font-display tracking-tight">
              Google Play Store
            </h3>
            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Get V Astra AI on your Android phone or tablet.
            </p>
          </div>
        </div>

        <div className={getActionTextClasses()}>
          <span>Get App</span>
          <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.a>

      {/* Box 2: Windows (Beta) */}
      <motion.button
        onClick={onOpenWindowsModal}
        className={getCardClasses()}
        id="windows-download-btn"
      >
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={getIconWrapperClasses()}>
              {/* Custom Windows Solid SVG */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95V12.45z" />
              </svg>
            </div>
            <ExternalLink className={`h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
          </div>

          <div className="space-y-1.5">
            <span className={`block text-[10px] uppercase tracking-wider font-bold font-mono opacity-60 ${isDarkMode ? "text-purple-300" : "text-blue-600"}`}>
              Desktop OS
            </span>
            <h3 className="text-base font-bold font-display tracking-tight">
              Windows Installer
            </h3>
            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Compatible with Windows 10 & 11 (x64 / x86_64).
            </p>
          </div>
        </div>

        <div className={getActionTextClasses()}>
          <span>Download Win</span>
          <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.button>

      {/* Box 3: Mac - Apple Silicon */}
      <motion.a
        href="https://drive.google.com/uc?export=download&confirm=t&id=14b_qC88nfkf66IS8WaodwaPp2hOJ1Rco"
        onClick={onDownloadClick}
        target="_blank"
        rel="noopener noreferrer"
        className={getCardClasses()}
        id="mac-silicon-download-btn"
      >
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={getIconWrapperClasses()}>
              {/* Official clean Apple solid icon */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className={`h-4 w-4 opacity-50 ${isDarkMode ? "text-purple-400" : "text-blue-600"}`} />
              <ExternalLink className={`h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className={`block text-[10px] uppercase tracking-wider font-bold font-mono opacity-60 ${isDarkMode ? "text-purple-300" : "text-blue-600"}`}>
              macOS Native
            </span>
            <h3 className="text-base font-bold font-display tracking-tight">
              Mac Apple Silicon
            </h3>
            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Built natively for Apple chips (M1, M2, M3 & newer).
            </p>
          </div>
        </div>

        <div className={getActionTextClasses()}>
          <span>Download (Apple)</span>
          <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.a>

      {/* Box 4: Mac - Intel Processors */}
      <motion.a
        href="https://drive.google.com/uc?export=download&confirm=t&id=1nQZHrfq8DAFSnV7NIgMWhm8llYC2Iwo1"
        onClick={onDownloadClick}
        target="_blank"
        rel="noopener noreferrer"
        className={getCardClasses()}
        id="mac-intel-download-btn"
      >
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-purple-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={getIconWrapperClasses()}>
              {/* Official clean Apple solid icon */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className={`h-4 w-4 opacity-50 ${isDarkMode ? "text-purple-400" : "text-blue-600"}`} />
              <ExternalLink className={`h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity ${isDarkMode ? "text-slate-400" : "text-slate-500"}`} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className={`block text-[10px] uppercase tracking-wider font-bold font-mono opacity-60 ${isDarkMode ? "text-purple-300" : "text-blue-600"}`}>
              macOS Intel
            </span>
            <h3 className="text-base font-bold font-display tracking-tight">
              Mac Intel CPU
            </h3>
            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              For older macOS systems with standard Intel processors.
            </p>
          </div>
        </div>

        <div className={getActionTextClasses()}>
          <span>Download (Intel)</span>
          <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.a>
    </div>
  );
}
