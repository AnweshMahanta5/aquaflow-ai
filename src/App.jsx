import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LayoutSelector from "./components/LayoutSelector";
import ScenarioList from "./components/ScenarioList";
import AIPanel from "./components/AIPanel";
import PlumberPanel from "./components/PlumberPanel";
import Footer from "./components/Footer";

const LAYOUTS = ["Small House", "Apartment", "School Block"];

const SCENARIOS = [
  {
    id: "normal-flow",
    name: "Normal Water Flow",
    severity: "Low",
    description: "Standard flow from ground tank to overhead tank to taps.",
  },
  {
    id: "tank-overflow",
    name: "Overflowing Overhead Tank",
    severity: "High",
    description:
      "Pump is still on even after the tank is full, causing water wastage.",
  },
  {
    id: "bathroom-leak",
    name: "Bathroom Pipe Leak",
    severity: "Medium",
    description: "Hidden leak near the bathroom line causing slow wastage.",
  },
  {
    id: "low-pressure-top-floor",
    name: "Low Pressure at Top Floor",
    severity: "Medium",
    description: "Upper taps receive very low pressure during peak usage.",
  },
  {
    id: "rainwater-wrong",
    name: "Rainwater Connected Wrongly",
    severity: "High",
    description:
      "Rainwater line is mixed with drinking-water line instead of harvesting.",
  },
];

function getSystemStatus(severity) {
  switch (severity) {
    case "High":
      return { label: "Critical issue", color: "bg-rose-500/15 text-rose-300 border-rose-500/40" };
    case "Medium":
      return { label: "Needs attention", color: "bg-amber-500/15 text-amber-200 border-amber-500/40" };
    case "Low":
    default:
      return { label: "Healthy", color: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40" };
  }
}

function getQuickStats(selectedLayout, selectedScenario) {
  // Just simple, readable numbers for UI feel.
  const baseUse =
    selectedLayout === "School Block"
      ? 8000
      : selectedLayout === "Apartment"
      ? 4500
      : 3000;

  const lossFactor =
    selectedScenario.id === "tank-overflow"
      ? 0.25
      : selectedScenario.id === "bathroom-leak"
      ? 0.12
      : selectedScenario.id === "rainwater-wrong"
      ? 0.08
      : 0.02;

  const pressureText =
    selectedScenario.id === "low-pressure-top-floor"
      ? "Low on upper taps"
      : "Normal";

  const dailyUse = baseUse;
  const estimatedLoss = Math.round(baseUse * lossFactor);

  return { dailyUse, estimatedLoss, pressureText };
}

export default function App() {
  const [selectedLayout, setSelectedLayout] = useState(LAYOUTS[0]);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);

  const status = getSystemStatus(selectedScenario.severity);
  const stats = getQuickStats(selectedLayout, selectedScenario);

  return (
    <div className="water-shell min-h-screen text-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-12 pt-6 space-y-8">
        {/* HERO / SUMMARY */}
        <section className="grid gap-6 lg:grid-cols-[3fr,2fr] items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Smart water management
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-3 py-1 text-sky-300 border border-sky-500/40">
                Tank & pipe monitoring
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-violet-300 border border-violet-500/40">
                AI assistant for water
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                AquaFlow AI – Water System Dashboard
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl">
                Monitor how water moves from your ground tank to overhead tanks
                and taps, simulate leaks and pressure issues, and use AI to
                plan better water usage. Locate nearby plumbers directly on the
                map when something goes wrong.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wide text-slate-400">
                  Current building
                </div>
                <div className="font-medium text-slate-50">
                  {selectedLayout}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wide text-slate-400">
                  Scenario simulated
                </div>
                <div className="font-medium text-slate-50">
                  {selectedScenario.name}
                </div>
              </div>
              <div
                className={`rounded-2xl border px-3 py-2 text-xs ${status.color}`}
              >
                <div className="text-[10px] uppercase tracking-wide">
                  System status
                </div>
                <div className="font-medium">{status.label}</div>
              </div>
            </div>
          </div>

          {/* compact "water system simulation" card */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-slate-950 p-4 space-y-3 shadow-xl shadow-sky-900/40">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Water system snapshot
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300">
                Demo simulation
              </span>
            </div>
            <div className="flex flex-col gap-3 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>Daily usage (approx.)</span>
                <span className="font-semibold">
                  {stats.dailyUse.toLocaleString()} L
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated water loss</span>
                <span className="font-semibold text-sky-300">
                  {stats.estimatedLoss.toLocaleString()} L/day
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pressure status</span>
                <span className="font-semibold text-emerald-300">
                  {stats.pressureText}
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-snug text-slate-400">
              These values are simulated for learning. Use the layout and
              scenario controls below with the AI assistant to reason about
              real systems in houses, apartments, and school buildings.
            </p>
          </div>
        </section>

        {/* MAIN DASHBOARD AREA */}
        <section className="grid gap-6 lg:grid-cols-[2.2fr,2.5fr] items-start">
          {/* LEFT COLUMN: controls + overview */}
          <div className="space-y-4">
            {/* Layout selector */}
            <LayoutSelector
              layouts={LAYOUTS}
              selectedLayout={selectedLayout}
              onChange={setSelectedLayout}
            />

            {/* Scenario selector */}
            <ScenarioList
              scenarios={SCENARIOS}
              selectedScenario={selectedScenario}
              onChange={setSelectedScenario}
            />

            {/* Water system overview card */}
            <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 md:p-5 space-y-3 shadow-lg shadow-sky-900/30">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    Water system overview
                  </h3>
                  <p className="text-xs text-slate-400">
                    Quick view of storage, flow and risk for the selected
                    layout and scenario.
                  </p>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    Impact level
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      selectedScenario.severity === "High"
                        ? "text-rose-300"
                        : selectedScenario.severity === "Medium"
                        ? "text-amber-200"
                        : "text-emerald-300"
                    }`}
                  >
                    {selectedScenario.severity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Storage layout
                  </div>
                  <div className="mt-1 font-medium text-slate-100">
                    Ground + overhead tank
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Water is lifted from the ground tank to an overhead tank,
                    then flows by gravity to taps.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Risk focus
                  </div>
                  <div className="mt-1 font-medium text-slate-100">
                    {selectedScenario.name}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {selectedScenario.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    Recommended next step
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Use the AI assistant to ask for{" "}
                    <span className="font-semibold">fixes</span>,{" "}
                    <span className="font-semibold">sensor ideas</span> or{" "}
                    <span className="font-semibold">water-saving tips</span> for
                    this layout and scenario.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: AI + plumbers */}
          <div className="space-y-4">
            <AIPanel layout={selectedLayout} scenario={selectedScenario} />
            <PlumberPanel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
