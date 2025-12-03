import { motion } from 'framer-motion';

export default function LayoutSelector({
  layouts,
  selectedLayout,
  onChange
}) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 sm:p-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-slate-100">
          1. Choose a layout
        </h2>
        <span className="text-[10px] sm:text-xs text-slate-400">
          Flow logic adapts to layout
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {layouts.map((layout) => {
          const active = layout === selectedLayout;
          return (
            <button
              key={layout}
              onClick={() => onChange(layout)}
              className={`rounded-full px-3 py-1.5 text-xs sm:text-sm border transition 
                ${
                  active
                    ? 'border-sky-500 bg-sky-500/20 text-sky-50 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]'
                    : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-sky-500/60 hover:text-sky-100'
                }`}
            >
              {layout}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
