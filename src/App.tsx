import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroAnimation from "./components/HeroAnimation";
import VastraMockup from "./components/VastraMockup";
import DownloadSection from "./components/DownloadSection";
import WindowsModal from "./components/WindowsModal";
import Footer from "./components/Footer";
import { Sparkles, Cpu, Shield, Zap, RefreshCw, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Theme state (Default to Dark Mode as per requirement)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("vastra-theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
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
      {/* Dynamic Glowing Accents (Only on Dark Mode for high-tech look) */}
      {isDarkMode && (
        <>
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "-3s" }} />
          <div className="absolute bottom-1/4 left-10 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "-5s" }} />
        </>
      )}

      {/* Header */}
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Main Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-10 sm:pt-16 md:pt-20 pb-16 relative z-10 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto" id="hero-section">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border font-mono tracking-wide ${
              isDarkMode
                ? "bg-purple-950/30 border-purple-800/40 text-purple-300"
                : "bg-indigo-50 border-indigo-100 text-indigo-700"
            }`}
            id="hero-tagline-badge"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            V Astra AI Native Suite - Release v2.4 (Beta)
          </motion.div>

          {/* Liquid Stagger Reveal Heading */}
          <HeroAnimation isDarkMode={isDarkMode} />

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
            id="hero-description"
          >
            Empower your daily workflow with V Astra AI, an advanced cognitive assistant designed for cross-platform offline speed, deep code understanding, and contextual memory integration. Experience intelligence unbound.
          </motion.p>
        </section>

        {/* Download & Interactive Interface Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="showcase-downloads">
          {/* Download cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display tracking-tight">
                Get the Native Client
              </h2>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Download V Astra AI to your desktop or mobile device. Local computational models run instantly with high security.
              </p>
            </div>

            <DownloadSection
              onDownloadClick={handleDownloadClick}
              onOpenWindowsModal={() => setIsWindowsModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Interactive Chat Sandbox App Mockup (Right) */}
          <div className="lg:col-span-7">
            <VastraMockup isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* Dynamic Bento-Style Core Features Showcase */}
        <section className="space-y-8" id="features-section">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Crafted for High Performance
            </h2>
            <p className={`text-sm sm:text-base max-w-md mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Experience powerful assistant capabilities tuned explicitly for your local system hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-850 hover:border-purple-500/30 hover:bg-slate-900/60"
                  : "bg-white border-slate-200/60 hover:border-blue-500/30 hover:bg-slate-50/50"
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base mb-2 font-display">Local GPU Acceleration</h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                V Astra AI delegates parsing to your hardware NPU and GPU, leading to ultra-low latency prompt compilation even when offline.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-850 hover:border-purple-500/30 hover:bg-slate-900/60"
                  : "bg-white border-slate-200/60 hover:border-blue-500/30 hover:bg-slate-50/50"
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base mb-2 font-display">Privacy First Architecture</h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Your database records, indices, and personal prompts stay strictly on your local device. No metadata trackers, no telemetry.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-850 hover:border-purple-500/30 hover:bg-slate-900/60"
                  : "bg-white border-slate-200/60 hover:border-blue-500/30 hover:bg-slate-50/50"
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base mb-2 font-display">Continuous Cloud Sync</h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Optionally sync workspaces across your Windows desktop, Mac workstation, and Android companion with secure end-to-end encryption keys.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Windows Modal */}
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
