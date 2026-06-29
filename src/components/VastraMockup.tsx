import React, { useState, useEffect } from "react";
import { Sparkles, Send, Bot, User, Check, Command, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VastraMockupProps {
  isDarkMode: boolean;
}

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export default function VastraMockup({ isDarkMode }: VastraMockupProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "user",
      text: "V Astra, analyze my project structure and optimize the local execution modules.",
    },
    {
      id: 2,
      sender: "bot",
      text: "Initializing V Astra context engines... I've scanned your files and structured a local compilation bundle. Using native OS optimization, we've achieved 4x faster response times offline.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto typing simulator for an ultra-alive feel
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
      const replyTimeout = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "bot",
            text: "Ready for launch! Download the native app for Windows, macOS, or Android to unlock continuous offline assistance.",
          },
        ]);
      }, 3500);
      return () => clearTimeout(replyTimeout);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: inputText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: `Analyzing: "${userMsg.text}". Astra cognitive engines are actively resolving this query within the local hardware context. Download the desktop bundle to test full speed!`,
        },
      ]);
    }, 1500);
  };

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-950/80 border-slate-800 shadow-purple-500/5"
          : "bg-white border-slate-200/80 shadow-slate-200/60"
      }`}
      id="vastra-chat-mockup"
    >
      {/* Mock Window Top Bar */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b ${
          isDarkMode ? "bg-slate-900/50 border-slate-850" : "bg-slate-50/80 border-slate-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span
            className={`text-xs font-mono font-medium ml-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            V Astra AI - Beta OS Sandbox
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center gap-1 font-bold ${
              isDarkMode
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
            }`}
          >
            <Cpu className="h-2.5 w-2.5 animate-pulse" />
            Local Model Active
          </span>
        </div>
      </div>

      {/* Main Interface Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 h-[350px]">
        {/* Sidebar Panel */}
        <div
          className={`hidden md:block p-4 border-r transition-colors ${
            isDarkMode ? "bg-slate-950 border-slate-850" : "bg-slate-50/30 border-slate-100"
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block mb-3 font-semibold">
            WORKSPACE
          </span>
          <div className="space-y-1.5">
            <div
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-600"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              General Intelligence
            </div>
            <div
              className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all hover:bg-slate-50/50 ${
                isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              Developer Terminal
            </div>
          </div>

          <div className="mt-8">
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block mb-3 font-semibold">
              DIAGNOSTICS
            </span>
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between">
                <span className="opacity-60">CPU Usage:</span>
                <span className="text-emerald-500 font-bold">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-60">RAM:</span>
                <span className="opacity-80">1.2 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-60">Latency:</span>
                <span className="text-emerald-500 font-bold">2.4ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="col-span-1 md:col-span-3 flex flex-col h-full overflow-hidden">
          {/* Scrollable messages container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-slate-800 text-slate-300"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-xl leading-relaxed ${
                      msg.sender === "user"
                        ? isDarkMode
                          ? "bg-slate-900 text-slate-200"
                          : "bg-slate-100 text-slate-800"
                        : isDarkMode
                        ? "bg-purple-950/20 text-slate-250 border border-purple-900/20"
                        : "bg-blue-50/50 text-slate-800 border border-blue-100/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center bg-purple-500/15 text-purple-400 shrink-0">
                  <Bot className="h-4 w-4 animate-bounce" />
                </div>
                <div
                  className={`p-3 rounded-xl flex items-center gap-1.5 ${
                    isDarkMode ? "bg-slate-900" : "bg-slate-100"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Form input */}
          <form
            onSubmit={handleSendMessage}
            className={`p-3 border-t flex items-center gap-2 ${
              isDarkMode ? "bg-slate-900/20 border-slate-850" : "bg-slate-50/20 border-slate-100"
            }`}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask V Astra AI anything..."
              className={`flex-1 px-3 py-2 rounded-xl text-xs outline-none transition-all ${
                isDarkMode
                  ? "bg-slate-950 border border-slate-800 text-slate-200 focus:border-purple-500/50"
                  : "bg-white border border-slate-200 text-slate-900 focus:border-blue-500/50"
              }`}
            />
            <button
              type="submit"
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                isDarkMode
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
