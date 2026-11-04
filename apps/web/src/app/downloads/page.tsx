"use client";

import { useState, useEffect } from "react";
import { Download, ShieldCheck, Terminal, FileCode, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DownloadsPage() {
  const [data, setData] = useState<any>({ releases: [], drivers: [], latestRelease: null });
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/downloads")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setData(resData);
        }
      })
      .catch(() => {});
  }, []);

  const handleSimulateDownload = (filename: string) => {
    setDownloadSuccess(`Downloading ${filename}... Your download has started.`);
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  const getDriverFile = (category: string) => {
    if (category === "Qualcomm") return "/downloads/Qualcomm_QDLoader_9008_Driver_x64.zip";
    if (category === "MediaTek") return "/downloads/MTK_USB_All_Drivers_v1.0.8.zip";
    if (category === "Samsung") return "/downloads/SAMSUNG_USB_Driver_for_Mobile_Phones.exe";
    return "/downloads/libusb-win32-devel-filter-1.2.6.0.exe";
  };

  const latest = data.latestRelease || {
    version: "v1.8.5",
    fileName: "Phoenix_Service_Tool_Setup_v1.8.5.exe",
    fileSize: "148.4 MB",
    checksumSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    changelog: `[v1.8.5 RELEASE NOTES]
- Added: Samsung 2026 Security Patch MTP FRP Reset (All Models)
- Added: Xiaomi HyperOS 2.0 Sideload Mi Account reset support
- Added: Qualcomm Firehose auto-detection for Snapdragon 8 Gen 2 / 8 Gen 3
- Improved: MediaTek BROM SLA/DA bypass speed increased by 40%
- Fixed: Windows 11 24H2 USB driver compatibility issue
- Added: Automatic COM Port scanning and baud rate negotiation`,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <Link href="/" className="text-xs font-medium text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 mb-3 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Download Center & Driver Packs</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Official Windows installer binaries, WHQL signed USB drivers, and release packages for professional GSM servicing.
        </p>
      </div>

      {downloadSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-medium text-emerald-300 flex items-center gap-2.5 backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {downloadSuccess}
        </div>
      )}

      {/* Main Release Box */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Latest Stable Build ({latest.version})
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Phoenix Service Tool {latest.version}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Complete standalone Windows package. Includes the core executable engine, automatic COM port detector, Qualcomm Sahara protocol stack, and MediaTek BROM auth bypass routines.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 py-1">
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                <span className="text-slate-400 block text-[11px] mb-0.5">FILE SIZE</span>
                <span className="font-semibold text-white">{latest.fileSize}</span>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                <span className="text-slate-400 block text-[11px] mb-0.5">OS SUPPORT</span>
                <span className="font-semibold text-white">Win 10 / 11 (64-bit)</span>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                <span className="text-slate-400 block text-[11px] mb-0.5">SIGNATURE</span>
                <span className="font-semibold text-emerald-400">WHQL Verified</span>
              </div>
            </div>

            {/* SHA256 Checksum */}
            <div className="rounded-xl bg-black/40 p-3.5 font-mono text-[11px] border border-white/5 text-slate-400">
              <span className="text-cyan-400 font-semibold block mb-1">SHA-256 Checksum:</span>
              <span className="break-all select-all text-slate-300">{latest.checksumSha256}</span>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
                download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
                onClick={() => handleSimulateDownload("Phoenix_Service_Tool_Setup_v1.8.5.exe")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
              >
                <Download className="h-4 w-4" />
                Download Setup v1.8.5 (.exe)
              </a>

              <Link
                href="/tool"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                <Terminal className="h-4 w-4 text-cyan-400" />
                Open Desktop Client Simulator
              </Link>
            </div>
          </div>

          {/* Changelog Box */}
          <div className="lg:col-span-5 rounded-xl bg-black/50 border border-white/5 p-5 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <span className="text-cyan-300 font-semibold flex items-center gap-2">
                <FileCode className="h-4 w-4" /> Changelog & Release Notes
              </span>
              <span className="text-[11px] text-slate-500">2026.11 Update</span>
            </div>
            <pre className="text-[11px] leading-relaxed whitespace-pre-wrap text-slate-300 overflow-x-auto">
              {latest.changelog}
            </pre>
          </div>
        </div>
      </div>

      {/* DRIVER PACKS SECTION */}
      <div id="drivers" className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Essential USB Drivers Package</h3>
          <p className="text-sm text-slate-400 mt-1">
            Install these drivers before connecting phones in EDL, BROM, or MTP mode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.drivers?.map((driver: any) => (
            <div
              key={driver.id}
              className="glass-panel rounded-2xl p-6 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                    {driver.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{driver.fileSize}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{driver.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{driver.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-slate-400">v{driver.version}</span>
                <a
                  href={getDriverFile(driver.category)}
                  download
                  onClick={() => handleSimulateDownload(driver.name)}
                  className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300 hover:bg-white/[0.08] hover:text-white transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> Download Driver
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DRIVER SIGNATURE INSTRUCTIONS */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-300 font-semibold text-sm">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span>Troubleshooting: Disable Windows Driver Signature Enforcement</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          If your PC does not recognize MediaTek Preloader or Qualcomm QDLoader 9008 COM ports on Windows 10 or 11:
        </p>
        <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1">
          <li>Hold down the <strong className="text-slate-300">Shift key</strong> and click <strong className="text-slate-300">Restart</strong> in the Windows Start menu.</li>
          <li>Choose <strong className="text-slate-300">Troubleshoot</strong> &gt; <strong className="text-slate-300">Advanced options</strong> &gt; <strong className="text-slate-300">Startup Settings</strong> &gt; <strong className="text-slate-300">Restart</strong>.</li>
          <li>Upon reboot, press key <strong className="text-slate-300">7</strong> or <strong className="text-slate-300">F7</strong> to select <em>"Disable driver signature enforcement"</em>.</li>
          <li>Reinstall the driver package from above and reconnect the phone.</li>
        </ol>
      </div>
    </div>
  );
}

