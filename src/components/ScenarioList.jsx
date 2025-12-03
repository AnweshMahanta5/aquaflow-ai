import { motion } from 'framer-motion';

const severityColors = {
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  Medium: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
  High: 'bg-rose-500/15 text-rose-200 border-rose-500/40'
};

export default function ScenarioList({
  scenarios,
  selectedScenario,
  onChange
}) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 sm:p-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-slate-100">
          2. Pick a scenario
        </h2>
        <span className="text-[10px] sm:text-xs text-slate-400">
          Visual & AI adjust to scenario
        </span>
      </div>
      <div className="grid gap-2 sm:gap-3">
        {scenarios.map((scenario) => {
          const active = scenario.id === selectedScenario.id;
          const sevColor = severityColors[scenario.severity] || '';
          return (
            <button
              key={scenario.id}
              onClick={() => onChange(scenario)}
              className={`w-full text-left rounded-xl border px-3 py-2.5 sm:px-3.5 sm:py-3 transition group ${
                active
                  ? 'border-sky-500 bg-sky-500/15 shadow-[0_0_0_1px_rgba(56,189,248,0.6)]'
                  : 'border-slate-800 bg-slate-900/70 hover:border-sky-500/60 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    active ? 'text-sky-50' : 'text-slate-100'
                  }`}
                >
                  {scenario.name}
                </p>
                <span
                  className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border ${sevColor}`}
                >
                  {scenario.severity} impact
                </span>
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
                {scenario.description}
              </p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
