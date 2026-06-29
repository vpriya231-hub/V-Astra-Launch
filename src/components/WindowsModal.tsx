import React from "react";
import { X, Download, Terminal, FolderOpen, FileCode, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WindowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDarkMode: boolean;
}

export default function WindowsModal({
  isOpen,
  onClose,
  onConfirm,
  isDarkMode,
}: WindowsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl p-6 shadow-2xl transition-colors duration-300 ${
              isDarkMode
                ? "bg-slate-900 border border-slate-800 text-slate-100 shadow-purple-500/10"
                : "bg-white border border-slate-200 text-slate-900 shadow-slate-200/50"
            }`}
            id="windows-modal"
          >
            {/* Ambient Background Glow (Dark Mode only) */}
            {isDarkMode && (
              <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
              id="close-modal-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95V12.45z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">
                  Windows Installation Guide
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Follow these steps to run V Astra AI (Beta)
                </p>
              </div>
            </div>

            {/* Guide Steps */}
            <div className="space-y-4 mb-8">
              {/* Step 1 */}
              <div className="flex gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDarkMode ? "bg-slate-800 text-blue-400" : "bg-slate-100 text-blue-600"
                }`}>
                  1
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5 text-blue-500" />
                    Download the Archive
                  </h4>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Click the <strong className="text-blue-500 font-medium">Proceed to Download</strong> button below to download the application package as a <code className="px-1 py-0.5 rounded bg-slate-800/50 text-amber-500 font-mono text-[11px]">ZIP</code> file.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDarkMode ? "bg-slate-800 text-blue-400" : "bg-slate-100 text-blue-600"
                }`}>
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-1.5">
                    <FolderOpen className="h-3.5 w-3.5 text-blue-500" />
                    Extract the Contents
                  </h4>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Locate the downloaded ZIP archive in your files, right-click, and select <strong className="font-medium">"Extract All..."</strong> to unzip the folder on your computer.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDarkMode ? "bg-slate-800 text-blue-400" : "bg-slate-100 text-blue-600"
                }`}>
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-1.5">
                    <FileCode className="h-3.5 w-3.5 text-blue-500" />
                    Launch the App
                  </h4>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Open the extracted folder and double-click the <code className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px] font-bold">V-Astra.exe</code> file to launch the assistant.
                  </p>
                </div>
              </div>

              {/* Note */}
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                isDarkMode 
                  ? "bg-slate-950/40 border-slate-800/80 text-slate-400" 
                  : "bg-slate-50 border-slate-100 text-slate-500"
              }`}>
                <Terminal className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-amber-500">Note:</span> Since this is a beta release, Windows Defender may show a warning. Click "More info" and then "Run anyway" to execute.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                id="cancel-modal-btn"
              >
                Cancel
              </button>
              <a
                href="https://drive.google.com/uc?export=download&confirm=t&id=1i7uASoWjXKJwhHz-bRWeDLyOmHTJf96R"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95"
                id="proceed-download-windows"
              >
                <Download className="h-4 w-4" />
                Proceed to Download
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
