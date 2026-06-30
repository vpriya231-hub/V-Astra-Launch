import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroAnimation from "./components/HeroAnimation";
import DownloadSection from "./components/DownloadSection";
import WindowsModal from "./components/WindowsModal";
import Footer from "./components/Footer";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Theme state (Default to Light Mode as per requirement)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("vastra-theme");
      // DEFAULT must be false (Light Mode) as requested
      return saved ? saved === "dark" : false;
    } catch {
      return false;
    }
  });

  // Download tracking state
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(() => {
    try {
      return localStorage.getItem("vastra-downloaded") === "true";
    } catch {
      return false;
    }
  });

  // Windows modal visibility state
  const [isWindowsModalOpen, setIsWindowsModalOpen] = useState(false);

  // Sync theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vastra-theme", isDarkMode ? "dark" : "light");
    } catch (e) {
      console.warn("localStorage not available", e);
    }
  }, [isDarkMode]);

  // Track download link click
  const handleDownloadClick = () => {
    setHasDownloaded(true);
    try {
      localStorage.setItem("vastra-downloaded", "true");
    } catch (e) {
      console.warn("localStorage not available", e);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden relative ${
        isDarkMode
          ? "bg-[#030712] text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
      id="main-app-container"
    >
      {/* Decorative Blur Backgrounds (Adaptive based on Theme) */}
      {isDarkMode ? (
        <>
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "-3s" }} />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-200/20 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-200/20 blur-[110px] pointer-events-none" />
        </>
      )}

      {/* Header */}
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Main Content Area: Centered Single Column Layout with Desktop-First Optimization */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 flex flex-col justify-center items-center py-16 sm:py-24 relative z-10 space-y-12">
        
        {/* App Introduction Hero */}
        <section className="text-center space-y-6 w-full" id="hero-section">
          {/* Tagline Release Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border font-mono tracking-wide ${
              isDarkMode
                ? "bg-purple-950/30 border-purple-800/40 text-purple-300"
                : "bg-indigo-50 border-indigo-100 text-indigo-700 shadow-sm"
            }`}
            id="hero-tagline-badge"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-purple-400 animate-pulse" />
            V Astra AI Native Suite - Release v2.4 (Beta)
          </motion.div>

          {/* Fluid Reveal Animated Title */}
          <HeroAnimation isDarkMode={isDarkMode} />

          {/* Clean Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-base sm:text-lg leading-relaxed max-w-xl mx-auto transition-colors duration-300 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
            id="hero-description"
          >
            V Astra AI is an advanced offline-first assistant application designed to optimize your workspace productivity, deliver swift cognitive processing, and unlock localized intelligence across all your platforms.
          </motion.p>
        </section>

        {/* Focused Download Interface Section */}
        <section className="w-full max-w-5xl mx-auto space-y-6" id="download-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h2 className="text-lg font-bold font-display tracking-tight">
                Select Your Platform
              </h2>
              <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Begin downloading the native desktop or mobile client.
              </p>
            </div>

            <DownloadSection
              onDownloadClick={handleDownloadClick}
              onOpenWindowsModal={() => setIsWindowsModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          </motion.div>
        </section>

      </main>

      {/* Windows Documentation Instructions Modal */}
      <WindowsModal
        isOpen={isWindowsModalOpen}
        onClose={() => setIsWindowsModalOpen(false)}
        onConfirm={handleDownloadClick}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer hasDownloaded={hasDownloaded} isDarkMode={isDarkMode} />
    </div>
  );
}
