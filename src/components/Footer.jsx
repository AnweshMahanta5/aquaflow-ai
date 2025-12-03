import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <div>
          AquaFlow AI · Smart water-management demo for{" "}
          <span className="text-slate-300 font-medium">
            tanks, pipes & plumbing
          </span>
          .
        </div>
        <div className="flex flex-wrap gap-3">
          <span>Focus: leak detection · pressure issues · water saving</span>
        </div>
      </div>
    </footer>
  );
}
