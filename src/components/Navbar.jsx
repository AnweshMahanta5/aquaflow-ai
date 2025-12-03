import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/40">
            <span className="text-xl">💧</span>
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-slate-50 text-sm md:text-base">
              AquaFlow AI
            </div>
            <div className="text-[11px] text-slate-400">
              Smart Water Management & Leak Detection
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex items-center gap-2 text-[11px]"
        >
          <span className="rounded-full px-3 py-1 border border-slate-700 bg-slate-900/80 text-slate-300">
            React + Vite + Tailwind
          </span>
          <span className="hidden sm:inline-flex rounded-full px-3 py-1 border border-sky-700 bg-sky-500/10 text-sky-200">
            Water analytics dashboard
          </span>
          <span className="hidden md:inline-flex rounded-full px-3 py-1 border border-emerald-700 bg-emerald-500/10 text-emerald-200">
            Gemini-ready water AI
          </span>
        </motion.div>
      </div>
    </header>
  );
}
