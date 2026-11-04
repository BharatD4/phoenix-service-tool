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
  Laptop,
  Layers,
  Sparkles,
} from "lucide-react";
import { INITIAL_SUPPORTED_DEVICES } from "@/lib/devicesData";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState<any[]>(INITIAL_SUPPORTED_DEVICES);
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.devices && data.devices.length > 0) {
          setModels(data.devices);
        }
      })
      .catch(() => {});
  }, []);

  const filteredModels = models.filter((m) => {
    const matchesBrand = selectedBrand === "ALL" || m.brand.toUpperCase() === selectedBrand.toUpperCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      m.modelName.toLowerCase().includes(query) ||
      m.modelCode.toLowerCase().includes(query) ||
      m.chipset.toLowerCase().includes(query) ||
      m.features.toLowerCase().includes(query) ||
      m.brand.toLowerCase().includes(query);
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION (Aligned with Phoenix Service Tool Official Showcase) */}
      <section className="relative pt-8 md:pt-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headlines & Action Buttons */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Version Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Version 10.0.6.0</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Phoenix Service<br />
                Tool
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                A Professional Grade Mobile Servicing Platform Supporting Samsung, Xiaomi, HMD/Nokia, Huawei, Vivo, Transsion, and Realme devices. Flash firmware, unlock bootloaders, Reset FRP, Reset accounts, and diagnose device information all from a single powerful tool.
              </p>

              {/* Action Buttons: Download Tool (White) & Telegram (Glass) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
                  download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-purple-500/10 hover:bg-slate-100 transition-all transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Download Tool
                </a>

                <a
                  href="https://t.me/phoenixservicetool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] hover:bg-white/[0.14] px-6 py-3.5 text-sm font-semibold text-white transition-all backdrop-blur-md"
                >
                  <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                  Telegram
                </a>

                <Link
                  href="/tool"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-purple-950/40 hover:bg-purple-900/50 px-4 py-3.5 text-xs font-semibold text-purple-200 transition-all"
                >
                  <Terminal className="h-4 w-4 text-purple-400" />
                  Live Web Tool
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Floating Perspective Tool Showcase (Matching Image) */}
            <div className="lg:col-span-6 relative">
              {/* Fiery ambient aura glow behind the showcase */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-600/25 via-rose-600/30 to-purple-600/30 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl border border-white/15 bg-[#120a2e]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* 3D Tilted Card Preview */}
                <div className="space-y-4">
                  {/* Top Bar with USB & Brand Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center">
                        <Flame className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-white">Phoenix Service Tool [ v10.0.6.0 ]</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="rounded bg-white/10 px-2 py-0.5 text-emerald-400 font-semibold border border-emerald-500/20">● Online</span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-slate-300">COM14 (9008)</span>
                    </div>
                  </div>

                  {/* Brand Pills */}
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
                    {["SAMSUNG", "XIAOMI", "OPLUS", "HMD", "HONOR", "TRANSSION"].map((b) => (
                      <span
                        key={b}
                        className={`px-2.5 py-1 rounded-md border ${
                          b === "XIAOMI"
                            ? "bg-purple-600/40 text-purple-200 border-purple-400"
                            : "bg-white/[0.04] text-slate-300 border-white/10"
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Split Preview Grid (Left: Terminal Logs, Right: Operations) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Left: Terminal Output */}
                    <div className="rounded-xl bg-[#0a051c] border border-white/10 p-3 font-mono text-[10px] text-slate-300 space-y-1">
                      <div className="text-emerald-400 font-bold pb-1 border-b border-white/5">
                        FUNCTION : XIAOMI BOOTLOADER UNLOCK
                      </div>
                      <div className="text-slate-400">Loading User Information... <span className="text-emerald-400">OK</span></div>
                      <div>Username : <span className="text-purple-300 font-semibold">SHRESHTHMOBILE</span></div>
                      <div>Credit : <span className="text-amber-300 font-semibold">5.48</span></div>
                      <div className="text-slate-400 pt-1">Loading Server Auth... <span className="text-emerald-400">OK</span></div>
                      <div className="text-amber-400/90 text-[9px] pt-1">
                        XIAOMI MTK V5 AUTH: <span className="text-emerald-400 font-bold">ONLINE</span> (5 CR)
                      </div>
                      <div className="text-amber-400/90 text-[9px]">
                        XIAOMI ASSISTANT FRP: <span className="text-emerald-400 font-bold">ONLINE</span> (3 CR)
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="space-y-2 flex flex-col justify-between">
                      <div className="rounded-lg bg-white/[0.03] border border-white/10 p-2 text-[11px]">
                        <span className="text-purple-300 font-bold block mb-1">Model:</span>
                        <div className="text-white text-xs font-semibold">Xiaomi Redmi Note 13 Pro 5G</div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="rounded-lg border border-purple-500/40 bg-purple-950/30 p-2 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm">
                          <span>ℹ</span> Read Info [ Fastboot Mode ]
                        </div>
                        <div className="rounded-lg border border-purple-500/40 bg-purple-950/30 p-2 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm">
                          <span>🔄</span> Fastboot To EDL
                        </div>
                        <div className="rounded-lg border border-purple-500/40 bg-purple-950/30 p-2 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm">
                          <span>🔒</span> Bootloader Unlock [ Fastboot ]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar inside Preview */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                    <span className="text-purple-300">Progress: 100%</span>
                    <span className="text-slate-400">Security: <strong className="text-emerald-400 font-bold">WHQL Verified</strong></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="border-y border-slate-800/80 bg-slate-900/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">180+</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Supported Models</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">99.8%</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Repair Success Rate</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">45,000+</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Active Technicians</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">Instant</div>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Cloud Credit Topup</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES (BENTO GRID) */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Smartphone Hardware Servicing
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Deep-level servicing algorithms engineered for Qualcomm Snapdragon, MediaTek Dimensity, Exynos, and Unisoc platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Samsung */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Samsung One-Click MTP FRP</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Remove Google FRP account locks across all modern Samsung Galaxy A, S, and Z series through standard MTP modem mode without opening the phone.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Android 9 through Android 14+</li>
              <li>• CSC Region Changer & Carrier Diagnostic</li>
              <li>• Odin Tar.md5 Firmware Flashing</li>
            </ul>
          </div>

          {/* Card 2: Xiaomi */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Xiaomi HyperOS & Mi Cloud</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Specialized Sideload mode integration to reset lost Mi Cloud account locks, plus authorized Fastboot-to-EDL 9008 conversion routines.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Mi Assistant Recovery Sideload Wipe</li>
              <li>• Fastboot-to-EDL 9008 Handshake</li>
              <li>• Bootloader Unlock Verification</li>
            </ul>
          </div>

          {/* Card 3: MediaTek */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">MediaTek BROM Auth Bypass</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Bypass hardware SLA/DA signature verification on Helio & Dimensity chipsets. Read and write RPMB partitions with zero risk.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Scatter File Flashing Engine</li>
              <li>• Safe Format Userdata + FRP</li>
              <li>• Read Preloader & Dump GPT Partitions</li>
            </ul>
          </div>

          {/* Card 4: Qualcomm */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                <Laptop className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Qualcomm EDL 9008 Sahara</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Send raw Sahara protocol packets and load official Firehose programmers (ELF/MBN) for unbricking and GPT partition manipulation.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Auto Firehose Programmer Match</li>
              <li>• Erase FRP & Config Partitions</li>
              <li>• RawProgram XML Flashing</li>
            </ul>
          </div>

          {/* Card 5: Transsion & Nokia */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Transsion & Nokia/HMD</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Deep servicing for Tecno, Infinix, itel, and Nokia devices. One-click MDM reset, network diagnostics, and factory restore.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Tecno Camon & Infinix Note Series</li>
              <li>• Nokia NB0 / PAC Firmware Flasher</li>
              <li>• Fix Bootloop & IMEI Repair Check</li>
            </ul>
          </div>

          {/* Card 6: Anti-Tamper Cloud */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Credits & HWID Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                PC-bound licensing with hardware fingerprint protection. Automated credit deduction only upon verified operation completion.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
              <li>• Instant Reseller Credit Transfer</li>
              <li>• DHRU Fusion & WebX GSM API</li>
              <li>• Transparent Audit Logs & Receipts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SUPPORTED MODELS DATABASE EXPLORER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Database Explorer
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                Check Phone Model & Chipset Compatibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time search across 180+ verified models, chipsets, and required credit costs.
              </p>
            </div>
            <Link
              href="/models"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              View Full Database ({models.length} Models) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Search Bar & Brand Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search phone model, code, or chipset (e.g. Dimensity 7200, S24, SM-A546, Garnet)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Brand Chips */}
            <div className="flex flex-wrap gap-1.5">
              {["ALL", "SAMSUNG", "XIAOMI", "TECNO", "INFINIX", "NOKIA", "VIVO"].map((b) => (
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

          {/* Models Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-[11px] uppercase text-slate-400 border-b border-slate-800 font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Brand & Model</th>
                  <th className="py-3 px-4">Model Code</th>
                  <th className="py-3 px-4">Chipset</th>
                  <th className="py-3 px-4">Supported Modes</th>
                  <th className="py-3 px-4">Available Functions</th>
                  <th className="py-3 px-4 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {filteredModels.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No models matching &ldquo;{searchQuery}&rdquo;. Try another chipset or brand.
                    </td>
                  </tr>
                ) : (
                  filteredModels.slice(0, 6).map((device) => (
                    <tr key={device.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                        {device.brand} {device.modelName}
                      </td>
                      <td className="py-3 px-4 text-cyan-300 font-mono text-[11px]">{device.modelCode}</td>
                      <td className="py-3 px-4 text-slate-400">{device.chipset}</td>
                      <td className="py-3 px-4">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200">
                          {device.supportedModes}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-300">{device.features}</td>
                      <td className="py-3 px-4 text-right font-bold text-amber-400 font-mono">
                        {device.creditCost} CR
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. PRICING & CREDIT PACKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pay Only For What You Repair
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            No expensive yearly subscriptions or dongle activations. Purchase credits as needed from authorized global distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Pack 1 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Starter Pack</h4>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-white">10</span>
                <span className="text-xs text-slate-400 ml-1">Credits</span>
                <div className="text-lg font-bold text-cyan-400 mt-0.5">$10.00</div>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Ideal for individual technicians and occasional repairs.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 mb-6">
                <li>✓ 2x Samsung FRP Resets</li>
                <li>✓ Instant Account Activation</li>
                <li>✓ 24/7 Cloud Server Access</li>
              </ul>
            </div>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 2: Popular */}
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/40 relative flex flex-col justify-between shadow-lg shadow-cyan-500/5">
            <div className="absolute -top-3 right-6 rounded-full bg-cyan-400 px-3 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
              Popular
            </div>
            <div>
              <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Technician Pack</h4>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-white">50</span>
                <span className="text-xs text-slate-400 ml-1">Credits</span>
                <div className="text-lg font-bold text-cyan-400 mt-0.5">$45.00</div>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Perfect for active mobile repair shops and servicing desks.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 mb-6">
                <li>✓ 10x Samsung / MTK Unlocks</li>
                <li>✓ 5x Xiaomi Mi Cloud Sideloads</li>
                <li>✓ Priority Cloud Server Queue</li>
              </ul>
            </div>
            <Link
              href="/resellers"
              className="block text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-semibold text-black hover:opacity-95 transition-opacity"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 3 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Workshop Pro</h4>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-white">100</span>
                <span className="text-xs text-slate-400 ml-1">Credits</span>
                <div className="text-lg font-bold text-cyan-400 mt-0.5">$85.00</div>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Designed for high-volume servicing centers and chains.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 mb-6">
                <li>✓ Full Unrestricted Operations</li>
                <li>✓ HWID Reset Permitted</li>
                <li>✓ Direct Telegram Support</li>
              </ul>
            </div>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Buy from Reseller
            </Link>
          </div>

          {/* Pack 4 */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Reseller Bulk</h4>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-white">500+</span>
                <span className="text-xs text-slate-400 ml-1">Credits</span>
                <div className="text-lg font-bold text-purple-400 mt-0.5">Wholesale</div>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Wholesale rates for GSM server distributors and portals.
              </p>
              <ul className="text-xs space-y-2 text-slate-300 mb-6">
                <li>✓ DHRU Fusion GSM API Key</li>
                <li>✓ Sub-User Instant Transfers</li>
                <li>✓ Listed in Official Reseller Hub</li>
              </ul>
            </div>
            <Link
              href="/resellers"
              className="block text-center rounded-xl border border-purple-500/30 bg-purple-950/40 py-2.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/50 transition-colors"
            >
              Apply as Reseller
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM DOWNLOAD CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-5 border-cyan-500/20 shadow-xl shadow-cyan-500/5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-black shadow-md shadow-cyan-400/20">
            <Flame className="h-6 w-6" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Service Android Devices in Minutes?
          </h3>

          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Download Phoenix Service Tool Setup v1.8.5, install the signed USB drivers, and connect your phone.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            <a
              href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
              download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black hover:opacity-95 transition-opacity"
            >
              <Download className="h-4 w-4" />
              Download Official Installer (.exe)
            </a>
            <Link
              href="/downloads#drivers"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
            >
              USB Drivers Package
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
