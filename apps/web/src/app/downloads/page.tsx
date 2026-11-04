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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <Link href="/" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 mb-2">
          <ArrowLeft className="h-3 w-3" /> Back to Home
        </Link>
        <h1 className="text-3xl font-black text-white">Download Center & Driver Packs</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Official Windows installer binaries, WHQL signed USB drivers, and historical release archives.
        </p>
      </div>

      {downloadSuccess && (
        <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/80 p-4 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-emerald">
          <CheckCircle2 className="h-4 w-4" />
          {downloadSuccess}
        </div>
      )}

      {/* Main Release Box */}
      <div className="rounded-3xl border-2 border-cyan-500/50 bg-[#0c1427] p-6 sm:p-10 shadow-cyan relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3 py-1 text-xs font-mono font-bold text-cyan-400 border border-cyan-800">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              LATEST STABLE RELEASE ({latest.version})
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Phoenix Service Tool Setup {latest.version}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete standalone Windows package. Includes the core executable engine, automatic COM port detector, Qualcomm Sahara protocol stack, and MediaTek BROM auth bypass routines.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300 py-2">
              <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                <span className="text-slate-500 block text-[10px]">FILE SIZE</span>
                <span className="font-bold text-white">{latest.fileSize}</span>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                <span className="text-slate-500 block text-[10px]">OS SUPPORT</span>
                <span className="font-bold text-white">Win 10 / 11 (64-bit)</span>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                <span className="text-slate-500 block text-[10px]">SIGNATURE</span>
                <span className="font-bold text-emerald-400">WHQL Verified</span>
              </div>
            </div>

            {/* SHA256 Checksum */}
            <div className="rounded-lg bg-black/80 p-3 font-mono text-[11px] border border-slate-800 text-slate-400">
              <span className="text-cyan-400 font-bold block mb-1">SHA-256 Checksum:</span>
              <span className="break-all select-all text-slate-300">{latest.checksumSha256}</span>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
                download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
                onClick={() => handleSimulateDownload("Phoenix_Service_Tool_Setup_v1.8.5.exe")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-sm font-bold text-black shadow-cyan hover:opacity-95 transition-all"
              >
                <Download className="h-4 w-4" />
                Download Setup v1.8.5 (.exe)
              </a>

              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-slate-900 px-6 py-3.5 text-sm font-mono font-bold text-cyan-300 hover:bg-slate-800 transition-colors"
              >
                <Terminal className="h-4 w-4" />
                Open Desktop Client Simulator
              </a>
            </div>
          </div>

          {/* Changelog Box */}
          <div className="lg:col-span-5 rounded-2xl bg-black/90 border border-slate-800 p-5 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <FileCode className="h-4 w-4" /> Changelog & Release Notes
              </span>
              <span className="text-[10px] text-slate-500">2026.11 Update</span>
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
          <h3 className="text-2xl font-bold text-white">Essential USB Drivers Package</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Install these drivers before connecting phones in EDL, BROM, or MTP mode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.drivers?.map((driver: any) => (
            <div
              key={driver.id}
              className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-slate-800 px-2.5 py-0.5 text-[11px] font-mono font-bold text-cyan-300 border border-slate-700">
                    {driver.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{driver.fileSize}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{driver.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{driver.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400">Ver: {driver.version}</span>
                <a
                  href={getDriverFile(driver.category)}
                  download
                  onClick={() => handleSimulateDownload(driver.name)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-700 px-3.5 py-1.5 text-xs font-mono font-bold text-cyan-400 hover:border-cyan-400 hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Download Driver
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DRIVER SIGNATURE INSTRUCTIONS */}
      <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <AlertTriangle className="h-5 w-5" />
          <span>Troubleshooting: Disable Windows Driver Signature Enforcement</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          If your PC does not recognize MediaTek Preloader or Qualcomm QDLoader 9008 COM ports on Windows 10 or 11:
        </p>
        <ol className="list-decimal list-inside text-xs font-mono text-slate-400 space-y-1">
          <li>Hold down the <strong>Shift key</strong> and click <strong>Restart</strong> in the Windows Start menu.</li>
          <li>Choose <strong>Troubleshoot</strong> &gt; <strong>Advanced options</strong> &gt; <strong>Startup Settings</strong> &gt; <strong>Restart</strong>.</li>
          <li>Upon reboot, press key <strong>7</strong> or <strong>F7</strong> to select <em>"Disable driver signature enforcement"</em>.</li>
          <li>Reinstall the driver package from above and reconnect the phone.</li>
        </ol>
      </div>
    </div>
  );
}

