"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Download,
  Terminal,
  ShieldCheck,
  Zap,
  Cpu,
  Flame,
  CheckCircle2,
  ArrowRight,
  Search,
  Users,
  Coins,
  Globe,
  Lock,
  Laptop
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setModels(data.devices || []);
        }
      })
      .catch(() => {});
  }, []);

  const filteredModels = models.filter((m) => {
    const matchesBrand = selectedBrand === "ALL" || m.brand.toUpperCase() === selectedBrand.toUpperCase();
    const matchesSearch =
      m.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.modelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.chipset.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono font-bold text-cyan-300 shadow-cyan">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                PHOENIX SERVICE TOOL v1.8.5 — 2026 PATCH READY
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Professional <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Mobile Servicing &
                </span>{" "}
                <br />
                Software Repair Hub
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                The all-in-one software servicing platform for GSM technicians. Instant Samsung MTP FRP bypass, Xiaomi HyperOS Sideload unlock, Qualcomm EDL 9008 Sahara auth, and MediaTek BROM repair without hardware dongles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/downloads"
                  className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-sm font-bold text-black shadow-cyan hover:opacity-95 transition-all transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Download Tool v1.8.5 (.exe)
                </Link>

                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-xl border border-cyan-500/40 bg-[#0f172a] px-6 py-3.5 text-sm font-mono font-bold text-cyan-300 hover:bg-slate-800 hover:border-cyan-400 transition-all shadow-cyan"
                >
                  <Terminal className="h-4 w-4" />
                  Launch Desktop Client
                </a>

                <Link
                  href="/models"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  Supported Models
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  No Dongle Required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  2026 Security Patches
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Instant Cloud Credits
                </div>
              </div>
            </div>

            {/* Right Column: High-Tech Tool Interface Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0c1220] p-4 shadow-2xl shadow-cyan/10">
                {/* Windows Styled Window Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500">
                      <Flame className="h-3.5 w-3.5 text-black" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white">
                      Phoenix Service Tool v1.8.5 [PRO]
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
                  </div>
                </div>

                {/* Subheader: Connected Mode & COM Port */}
                <div className="flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-2 text-xs font-mono mb-3 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">PORT:</span>
                    <span className="text-emerald-400 font-bold">COM14 (Samsung Mobile USB)</span>
                  </div>
                  <div className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-800">
                    MTP READY
                  </div>
                </div>

                {/* Simulated Tool Tabs */}
                <div className="flex gap-1.5 border-b border-slate-800 pb-2 mb-3 text-[11px] font-mono">
                  <span className="rounded bg-cyan-950 px-2.5 py-1 text-cyan-300 border border-cyan-700 font-bold">
                    SAMSUNG
                  </span>
                  <span className="px-2.5 py-1 text-slate-400 hover:text-white">XIAOMI</span>
                  <span className="px-2.5 py-1 text-slate-400 hover:text-white">MEDIATEK</span>
                  <span className="px-2.5 py-1 text-slate-400 hover:text-white">QUALCOMM</span>
                </div>

                {/* Simulated Terminal Window */}
                <div className="rounded-lg bg-black/90 p-3 font-mono text-[11px] space-y-1.5 text-slate-300 border border-slate-800/80">
                  <div className="text-slate-500">[14:08:22] Initializing USB subsystem... OK</div>
                  <div className="text-slate-400">[14:08:23] Device Detected: Samsung Galaxy A54 5G (SM-A546E)</div>
                  <div className="text-cyan-400">[14:08:24] Mode: MTP Modem Mode (COM14)</div>
                  <div className="text-amber-400">[14:08:25] Reading Knox & Security patch: 2026-08 (Vulnerable)</div>
                  <div className="text-slate-400">[14:08:26] Checking Server Auth & Deducting 5 Credits...</div>
                  <div className="text-emerald-400">[14:08:27] Authorization Token verified (AuthID: #910283)</div>
                  <div className="text-cyan-300">[14:08:28] Injecting test AT-commands... BYPASSING FRP...</div>
                  <div className="text-emerald-400 font-bold">
                    [14:08:30] &gt;&gt;&gt; FRP REMOVED SUCCESSFULLY! REBOOTING PHONE...
                  </div>
                </div>

                {/* Quick Simulation Trigger Link */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Live Server Balance: <strong className="text-amber-300">85 Credits</strong>
                  </span>
                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    Open Full Tool &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STATS BANNER */}
      <section className="border-y border-border/80 bg-slate-950/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">180+</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Supported Models</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">99.8%</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Repair Success Rate</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">45,000+</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Active Technicians</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">0 sec</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Instant Cloud Activation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            POWERFUL CAPABILITIES
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered For Every Major Smartphone Chipset
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            From emergency Qualcomm EDL 9008 Sahara handshakes to MediaTek BROM auth bypass and Samsung one-click MTP AT commands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Samsung */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950 text-blue-400 border border-blue-800 mb-4 group-hover:scale-105 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Samsung One-Click MTP FRP</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Bypass Google FRP verification on all modern Samsung Galaxy A, S, and Z series through standard MTP modem mode without opening the phone.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Android 9 through Android 14+</li>
              <li>• Read Pit, CSC Changer & Reboot</li>
              <li>• Odin Tar.md5 Firmware Flasher</li>
            </ul>
          </div>

          {/* Card 2: Xiaomi */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-950 text-orange-400 border border-orange-800 mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Xiaomi HyperOS & Mi Cloud</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Specialized Sideload mode integration to reset lost Mi Account locks, plus authorized Fastboot to EDL conversion routines.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Mi Assistant Sideload Wipe</li>
              <li>• Fastboot-to-EDL 9008 Handshake</li>
              <li>• Bootloader Unlock Verification</li>
            </ul>
          </div>

          {/* Card 3: MediaTek */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">MediaTek BROM Auth Bypass</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Disable hardware SLA/DA signature verification on Helio & Dimensity chipsets. Read and write RPMB partitions with zero risk.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Scatter File Flashing Engine</li>
              <li>• Safe Format Userdata + FRP</li>
              <li>• Read Preloader & Dump GPT</li>
            </ul>
          </div>

          {/* Card 4: Qualcomm */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950 text-purple-400 border border-purple-800 mb-4 group-hover:scale-105 transition-transform">
              <Laptop className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Qualcomm EDL 9008 Sahara</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Send raw Sahara protocol packets and load official Firehose programmers (ELF/MBN) for unbricking and GPT partition manipulation.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Auto Firehose Programmer Match</li>
              <li>• Erase FRP & Config Partitions</li>
              <li>• RawProgram XML Flashing</li>
            </ul>
          </div>

          {/* Card 5: Transsion & Nokia */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 mb-4 group-hover:scale-105 transition-transform">
              <Lock className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Transsion & Nokia/HMD</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Deep servicing for Tecno, Infinix, itel, and Nokia devices. One-click MDM reset, network diagnostics, and factory restore.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Tecno Camon & Infinix Note Series</li>
              <li>• Nokia NB0 / PAC Firmware Flasher</li>
              <li>• Fix Bootloop & IMEI Repair Check</li>
            </ul>
          </div>

          {/* Card 6: Anti-Tamper Cloud */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all hover:shadow-cyan group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950 text-amber-400 border border-amber-800 mb-4 group-hover:scale-105 transition-transform">
              <Coins className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Cloud Credits & HWID Security</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              PC-bound licensing with hardware fingerprint protection. Automated credit deduction only upon verified operation completion.
            </p>
            <ul className="text-xs font-mono text-slate-300 space-y-1.5">
              <li>• Instant Reseller Credit Transfer</li>
              <li>• DHRU Fusion & WebX GSM API</li>
              <li>• Transparent Audit Logs & Receipts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SUPPORTED MODELS SEARCH PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-[#0a0f1d] p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                DATABASE EXPLORER
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Check Your Phone Model Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Search over 180+ devices, chipsets, and required credit costs.
              </p>
            </div>
            <Link
              href="/models"
              className="text-xs font-mono font-bold text-cyan-400 hover:underline flex items-center gap-1.5"
            >
              View Full Matrix ({models.length} Models) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Search Bar & Brand Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search model (e.g., Galaxy S24, Redmi Note 13, Dimensity, SM-A546)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Brand Chips */}
            <div className="flex flex-wrap gap-1.5">
              {["ALL", "SAMSUNG", "XIAOMI", "TECNO", "INFINIX", "NOKIA", "VIVO"].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                    selectedBrand === b
                      ? "bg-cyan-500 text-black shadow-cyan"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Models Table Preview */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Brand & Model</th>
                  <th className="py-3 px-4">Model Code</th>
                  <th className="py-3 px-4">Chipset</th>
                  <th className="py-3 px-4">Supported Modes</th>
                  <th className="py-3 px-4">Available Functions</th>
                  <th className="py-3 px-4 text-right">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {filteredModels.slice(0, 5).map((device) => (
                  <tr key={device.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      {device.brand} {device.modelName}
                    </td>
                    <td className="py-3 px-4 text-cyan-300">{device.modelCode}</td>
                    <td className="py-3 px-4 text-slate-400">{device.chipset}</td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                        {device.supportedModes}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-300">{device.features}</td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400">
                      {device.creditCost} CR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING & CREDIT PACKAGES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            FLEXIBLE LICENSING
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pay Only For What You Repair
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            No expensive yearly subscriptions or dongle activations. Purchase credits from authorized global distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Pack 1 */}
          <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 hover:border-slate-700 transition-colors">
            <h4 className="text-sm font-mono text-slate-400 uppercase">Starter Pack</h4>
            <div className="my-4">
              <span className="text-3xl font-black text-white font-mono">10</span>
              <span className="text-xs text-slate-400 ml-1">Credits</span>
              <div className="text-xl font-bold text-cyan-400 mt-1">$10.00</div>
            </div>
            <p className="text-xs text-slate-400 mb-6">Ideal for occasional servicing & individual repairs.</p>
            <ul className="text-xs space-y-2 text-slate-300 mb-6 font-mono">
              <li>✓ 2x Samsung FRP Resets</li>
              <li>✓ Instant Account Activation</li>
              <li>✓ 24/7 Server Access</li>
            </ul>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 2: Popular */}
          <div className="rounded-2xl border-2 border-cyan-500 bg-[#0c1427] p-6 shadow-cyan relative">
            <div className="absolute -top-3 right-6 rounded-full bg-cyan-400 px-3 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
              Most Popular
            </div>
            <h4 className="text-sm font-mono text-cyan-400 uppercase">Technician Pack</h4>
            <div className="my-4">
              <span className="text-3xl font-black text-white font-mono">50</span>
              <span className="text-xs text-slate-400 ml-1">Credits</span>
              <div className="text-xl font-bold text-cyan-400 mt-1">$45.00</div>
            </div>
            <p className="text-xs text-slate-400 mb-6">Perfect for active mobile repair shops and technicians.</p>
            <ul className="text-xs space-y-2 text-slate-300 mb-6 font-mono">
              <li>✓ 10x Samsung / MTK Unlocks</li>
              <li>✓ 5x Xiaomi Mi Cloud Sideloads</li>
              <li>✓ Priority Server Auth Queue</li>
            </ul>
            <Link
              href="/resellers"
              className="block text-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-2.5 text-xs font-bold text-black shadow-cyan hover:opacity-95 transition-opacity"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 3 */}
          <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 hover:border-slate-700 transition-colors">
            <h4 className="text-sm font-mono text-slate-400 uppercase">Pro Workshop</h4>
            <div className="my-4">
              <span className="text-3xl font-black text-white font-mono">100</span>
              <span className="text-xs text-slate-400 ml-1">Credits</span>
              <div className="text-xl font-bold text-cyan-400 mt-1">$85.00</div>
            </div>
            <p className="text-xs text-slate-400 mb-6">Designed for high-volume service centers.</p>
            <ul className="text-xs space-y-2 text-slate-300 mb-6 font-mono">
              <li>✓ Full Unrestricted Operations</li>
              <li>✓ HWID Reset Support</li>
              <li>✓ Direct Telegram Tech Support</li>
            </ul>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 4: Reseller */}
          <div className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-slate-700 transition-colors">
            <h4 className="text-sm font-mono text-purple-400 uppercase">Reseller Bulk</h4>
            <div className="my-4">
              <span className="text-3xl font-black text-white font-mono">500+</span>
              <span className="text-xs text-slate-400 ml-1">Credits</span>
              <div className="text-xl font-bold text-purple-400 mt-1">Wholesale</div>
            </div>
            <p className="text-xs text-slate-400 mb-6">Wholesale rates for GSM server distributors and portals.</p>
            <ul className="text-xs space-y-2 text-slate-300 mb-6 font-mono">
              <li>✓ DHRU Fusion GSM API Key</li>
              <li>✓ Sub-User Instant Transfers</li>
              <li>✓ Listed in Official Reseller Hub</li>
            </ul>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-purple-800 bg-purple-950/60 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-900 transition-colors"
            >
              Apply as Reseller
            </Link>
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-950 p-8 sm:p-12 text-center space-y-6 shadow-cyan">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-black shadow-cyan">
            <Flame className="h-8 w-8 animate-pulse" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Service Android Devices in Minutes?
          </h3>

          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Download Phoenix Service Tool Setup v1.8.5, install the signed USB drivers, and connect your phone.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/downloads"
              className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black hover:bg-cyan-300 transition-colors shadow-cyan"
            >
              <Download className="h-4 w-4" />
              Download Official Installer (.exe)
            </Link>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border bg-slate-900 px-6 py-3.5 text-sm font-mono font-bold text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <Terminal className="h-4 w-4" />
              Open Desktop Client Simulator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

