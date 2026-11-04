"use client";

import { useState, useEffect } from "react";
import { Search, ShieldCheck, Cpu, ArrowLeft, Filter, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { INITIAL_SUPPORTED_DEVICES } from "@/lib/devicesData";

export default function ModelsPage() {
  const [devices, setDevices] = useState<any[]>(INITIAL_SUPPORTED_DEVICES);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedMode, setSelectedMode] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.devices && data.devices.length > 0) {
          setDevices(data.devices);
        }
      })
      .catch(() => {});
  }, []);

  const brands = ["ALL", "SAMSUNG", "XIAOMI", "TECNO", "INFINIX", "NOKIA", "VIVO"];
  const modes = ["ALL", "MTP", "EDL", "BROM", "FASTBOOT", "SIDELOAD"];

  const filtered = devices.filter((d) => {
    const brandMatch = selectedBrand === "ALL" || d.brand.toUpperCase() === selectedBrand.toUpperCase();
    const modeMatch = selectedMode === "ALL" || d.supportedModes.toUpperCase().includes(selectedMode.toUpperCase());
    const searchMatch =
      d.modelName.toLowerCase().includes(search.toLowerCase()) ||
      d.modelCode.toLowerCase().includes(search.toLowerCase()) ||
      d.chipset.toLowerCase().includes(search.toLowerCase()) ||
      d.features.toLowerCase().includes(search.toLowerCase());
    return brandMatch && modeMatch && searchMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-black text-white">Supported Phone Models & Chipsets</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search verified hardware compatibility, required servicing modes, and credit consumption.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-mono text-cyan-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Database Active: <strong>{filtered.length}</strong> Models Loaded</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-panel rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Type any model name, model code, or chipset (e.g. S24, Dimensity 7200, SM-A546, Garnet)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Brand Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 min-w-[70px]">
            <Filter className="h-3 w-3" /> Brand:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedBrand === b
                    ? "bg-cyan-500 text-black shadow-sm"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 min-w-[70px]">
            <Cpu className="h-3 w-3" /> Mode:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMode(m)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedMode === m
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Models Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-[11px] uppercase text-slate-400 border-b border-slate-800 font-semibold tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Brand & Model</th>
              <th className="py-3.5 px-4">Model Code / Hardware</th>
              <th className="py-3.5 px-4">Chipset</th>
              <th className="py-3.5 px-4">Connection Modes</th>
              <th className="py-3.5 px-4">Available Servicing Functions</th>
              <th className="py-3.5 px-4">Credit Cost</th>
              <th className="py-3.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No matching models found. Try clearing your search query.
                </td>
              </tr>
            ) : (
              filtered.map((device) => (
                <tr key={device.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                    {device.brand} {device.modelName}
                  </td>
                  <td className="py-3.5 px-4 text-cyan-300 font-mono text-[11px] font-medium">{device.modelCode}</td>
                  <td className="py-3.5 px-4 text-slate-400">{device.chipset}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {device.supportedModes.split(",").map((mode: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200"
                        >
                          {mode.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-xs leading-relaxed">
                    {device.features}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">
                    {device.creditCost} Credits
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                      {device.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Test Points Notice */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Qualcomm EDL & MediaTek Test Points Info</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            For phones without software EDL/BROM triggering, short the motherboard Test Point pins to Ground (GND) before inserting the USB cable. Ensure the signed Qualcomm QDLoader 9008 Driver or MediaTek VCOM Driver is installed from our Downloads hub.
          </p>
        </div>
      </div>
    </div>
  );
}

