import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { askGemini } from '../services/gemini.js';

export default function AIPanel({ layout, scenario }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('general'); // 'general' | 'scenario'

  // When layout/scenario changes, clear answer & error but keep question and mode
  useEffect(() => {
    setAnswer('');
    setError('');
  }, [layout, scenario]);

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please type a question about water or water management.');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const text = await askGemini(question, layout, scenario, mode);
      setAnswer(text);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          'Something went wrong while talking to Gemini. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  const isScenarioMode = mode === 'scenario';

  return (
    <motion.div
      className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-4 sm:p-5 shadow-glass"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-slate-50 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 text-xs">
            🤖
          </span>
          AI assistant (Gemini)
        </h2>

        {/* Mode toggle */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
          <button
            type="button"
            onClick={() => setMode('general')}
            className={`px-2.5 py-1 rounded-full border transition ${
              mode === 'general'
                ? 'border-sky-500 bg-sky-500/20 text-sky-100'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-sky-500/60 hover:text-sky-100'
            }`}
          >
            General
          </button>
          <button
            type="button"
            onClick={() => setMode('scenario')}
            className={`px-2.5 py-1 rounded-full border transition ${
              mode === 'scenario'
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-50'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-100'
            }`}
          >
            Use layout + scenario
          </button>
        </div>
      </div>

      <p className="text-[11px] sm:text-xs text-slate-400 mb-2">
        Ask anything about water management, leaks, tanks, pumps, rainwater
        harvesting or plumbing. AquaFlow&apos;s AI help agent will only answer
        water-related questions.
      </p>

      {/* Context hint */}
      <div className="mb-2 text-[10px] sm:text-[11px] text-slate-500">
        {isScenarioMode ? (
          <>
            Question will use the current selection:{' '}
            <span className="text-emerald-300 font-medium">
              {layout || '—'}
            </span>{' '}
            ·{' '}
            <span className="text-emerald-200">
              {scenario?.name || 'No scenario selected'}
            </span>
          </>
        ) : (
          <>Question is treated as a general water-management question.</>
        )}
      </div>

      <form onSubmit={handleAsk} className="space-y-2 mb-3">
        <textarea
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-[11px] sm:text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500 resize-none min-h-[70px]"
          placeholder={
            isScenarioMode
              ? 'Example: In this layout and scenario, what changes can we make to reduce water loss?'
              : 'Example: How can I reduce water wastage in my house or school?'
          }
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={loading}
            className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full border border-sky-500/80 bg-sky-500/15 text-sky-100 hover:bg-sky-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {loading && (
              <span className="inline-flex h-3 w-3 border-2 border-sky-200 border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Thinking…' : 'Ask AquaFlow AI'}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-1 text-[10px] sm:text-[11px] text-rose-300">
          {error}
        </p>
      )}

      {answer && (
        <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 max-h-64 overflow-y-auto">
          <p className="text-[11px] sm:text-xs text-slate-100 whitespace-pre-line leading-relaxed">
            {answer}
          </p>
        </div>
      )}

      {!answer && !error && !loading && (
        <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">
          Tip: In scenario mode, you can ask things like &quot;For this school
          block layout, how can we reuse rainwater?&quot; In general mode, you
          can ask any water question not tied to a specific layout.
        </p>
      )}

      <div className="mt-4 border-t border-slate-800 pt-3">
        <p className="text-[10px] sm:text-[11px] text-slate-400">
          AquaFlow&apos;s AI help agent focuses only on water and
          water-management topics.
        </p>
      </div>
    </motion.div>
  );
}
