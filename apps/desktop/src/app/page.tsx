"use client";

import { useState, useEffect, useRef } from "react";
import {
  Flame,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  RefreshCw,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Coins,
  Laptop,
  FolderOpen,
  FileCode,
  HardDrive,
  Copy,
  Trash2,
  Sliders,
  ExternalLink,
  Minus,
  Square,
  X,
} from "lucide-react";

export default function DesktopToolApp() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"samsung" | "xiaomi" | "mtk" | "qualcomm" | "device_mgr">("samsung");

  // Server & User state
  const [serverStatus, setServerStatus] = useState("CONNECTING...");
  const [currentUser, setCurrentUser] = useState<any>({
    username: "technician1",
    credits: 85,
    hwid: "HWID-A49F-83CD-9011-B7E2",
  });

  // Hardware Connection state
  const [comPort, setComPort] = useState("COM14");
  const [baudRate, setBaudRate] = useState("115200");
  const [deviceMode, setDeviceMode] = useState<"DISCONNECTED" | "MTP" | "FASTBOOT" | "EDL_9008" | "BROM">("MTP");
  const [simulationMode, setSimulationMode] = useState(true);

  // Operation state
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  // Logs state
  const [logs, setLogs] = useState<Array<{ id: string; text: string; type: "info" | "success" | "warn" | "error" | "cloud" }>>([
    { id: "1", text: "[SYSTEM] Phoenix Service Tool v1.8.5 Loaded. Engine Version: 2026.11", type: "info" },
    { id: "2", text: "[DRIVER] USB Subsystem initialized. LibUSB-Win32 filter driver loaded.", type: "info" },
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Initial cloud handshake
  useEffect(() => {
    appendLog("[CLOUD] Connecting to Phoenix Cloud Server (http://localhost:3000)...", "info");

    fetch("http://localhost:3000/api/tool/handshake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "technician1",
        hwid: "HWID-A49F-83CD-9011-B7E2",
        toolVersion: "v1.8.5",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.session) {
          setServerStatus("ONLINE");
          setCurrentUser((prev: any) => ({
            ...prev,
            credits: data.session.credits,
            username: data.session.username,
            hwid: data.session.hwid,
          }));
          appendLog(`[CLOUD] Authorized as '${data.session.username}'. Balance: ${data.session.credits} Credits.`, "cloud");
          appendLog(`[SECURITY] HWID fingerprint verified: ${data.session.hwid.slice(0, 16)}...`, "success");
        } else {
          setServerStatus("OFFLINE");
          appendLog(`[CLOUD WARNING] ${data.message || "Failed to reach cloud. Running local cache."}`, "warn");
        }
      })
      .catch(() => {
        setServerStatus("STANDALONE");
        appendLog("[CLOUD] Server offline or disconnected. Running in Standalone Simulation mode.", "warn");
      });
  }, []);

  const appendLog = (text: string, type: "info" | "success" | "warn" | "error" | "cloud" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { id: Math.random().toString(), text: `[${time}] ${text}`, type }]);
  };

  const clearLogs = () => {
    setLogs([{ id: "0", text: "[SYSTEM] Console cleared by technician.", type: "info" }]);
  };

  // Generic repair operation runner with Cloud Credit Handshake
  const executeRepairOperation = async (params: {
    brand: string;
    model: string;
    action: string;
    chipset: string;
    mode: string;
    cost: number;
    steps: Array<{ desc: string; delay: number; logType?: any }>;
  }) => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(5);
    setCurrentStep(params.action);

    appendLog(`------------------------------------------------------------`, "info");
    appendLog(`[START] Initiating ${params.action} on ${params.brand} ${params.model}...`, "info");
    appendLog(`[HARDWARE] Port: ${comPort} | Baud: ${baudRate} | Mode: ${params.mode}`, "info");

    // 1. Cloud Credit Verification
    appendLog(`[CLOUD] Verifying server credit balance for ${params.action}...`, "cloud");

    let authToken = "local_demo_token";
    try {
      const verifyRes = await fetch("http://localhost:3000/api/tool/verify-operation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          hwid: currentUser.hwid,
          brand: params.brand,
          model: params.model,
          action: params.action,
        }),
      });
      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        authToken = verifyData.authToken;
        appendLog(`[CLOUD] Operation authorized. Required credits: ${params.cost}. Token: ${authToken.slice(0, 12)}...`, "cloud");
      } else {
        appendLog(`[CLOUD ERROR] ${verifyData.message}`, "error");
        setIsRunning(false);
        setProgress(0);
        return;
      }
    } catch {
      appendLog(`[CLOUD] Proceeding with offline simulation token.`, "warn");
    }

    // 2. Step-by-step device protocol simulation
    const totalSteps = params.steps.length;
    for (let i = 0; i < totalSteps; i++) {
      const step = params.steps[i];
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      setProgress(Math.round(((i + 1) / totalSteps) * 90));
      appendLog(step.desc, step.logType || "info");
    }

    // 3. Finalize and deduct credits from Cloud Server
    appendLog(`[CLOUD] Sending final verification token to deduct ${params.cost} credits...`, "cloud");
    try {
      const compRes = await fetch("http://localhost:3000/api/tool/complete-operation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          brand: params.brand,
          model: params.model,
          action: params.action,
          chipset: params.chipset,
          mode: params.mode,
          creditsDeducted: params.cost,
          status: "SUCCESS",
          hwid: currentUser.hwid,
          logDetails: `Operation completed successfully on ${comPort}.`,
        }),
      });
      const compData = await compRes.json();
      if (compData.success) {
        setCurrentUser((prev: any) => ({ ...prev, credits: compData.newBalance }));
        appendLog(`[CLOUD] Server balance updated: ${compData.newBalance} Credits remaining.`, "cloud");
      }
    } catch {
      setCurrentUser((prev: any) => ({ ...prev, credits: Math.max(0, prev.credits - params.cost) }));
      appendLog(`[CLOUD] Local credits adjusted: -${params.cost} CR`, "cloud");
    }

    setProgress(100);
    appendLog(`[SUCCESS] >>> ${params.action} COMPLETED SUCCESSFULLY! <<<`, "success");
    appendLog(`[DEVICE] Rebooting device to normal system mode...`, "info");
    appendLog(`------------------------------------------------------------`, "info");

    setIsRunning(false);
    setTimeout(() => {
      setProgress(0);
      setCurrentStep(null);
    }, 2500);
  };

  /* BRAND OPERATION HANDLERS */

  // 1. Samsung MTP FRP Reset
  const handleSamsungFRP = () => {
    executeRepairOperation({
      brand: "Samsung",
      model: "Galaxy A54 / S24 (All Models)",
      action: "SAMSUNG_FRP_MTP_2026",
      chipset: "Exynos / Snapdragon",
      mode: "MTP",
      cost: 5,
      steps: [
        { desc: "[USB] Detecting Samsung Modem on COM14...", delay: 600 },
        { desc: "[AT] Sending AT+DEVCONINFO... OK (Model: SM-A546E)", delay: 800, logType: "info" },
        { desc: "[AT] Reading Knox status: 0x0 | Security: 2026-08 (Vulnerable)", delay: 700, logType: "info" },
        { desc: "[MTP] Enabling Test Mode via Emergency Call dialer (*#0*# / *#9900#)...", delay: 900, logType: "warn" },
        { desc: "[INJECT] Injecting AT+KNOX_UNSECURE token payload...", delay: 1000, logType: "info" },
        { desc: "[ADB] Spawning temporary test bridge... Authorized!", delay: 800, logType: "success" },
        { desc: "[FRP] Sending content call: 'content://settings/secure/user_setup_complete = 1'", delay: 900, logType: "info" },
        { desc: "[FRP] Clearing Google Account package caches: com.google.android.gms", delay: 700, logType: "success" },
        { desc: "[AT] Sending AT+REBOOT... OK", delay: 500, logType: "info" },
      ],
    });
  };

  // 2. Xiaomi Mi Account Sideload Reset
  const handleXiaomiMiAccount = () => {
    executeRepairOperation({
      brand: "Xiaomi",
      model: "Redmi Note 13 Pro+ / HyperOS",
      action: "XIAOMI_MI_ACCOUNT_SIDELOAD",
      chipset: "Dimensity 7200 / Snapdragon",
      mode: "SIDELOAD",
      cost: 10,
      steps: [
        { desc: "[USB] Checking Mi Assistant Sideload Mode on ADB interface...", delay: 700 },
        { desc: "[SIDELOAD] Handshake: Mi Assistant Recovery v5.0 Detected", delay: 800, logType: "info" },
        { desc: "[READ] Reading Model: Zircon (Redmi Note 13 Pro+) | Region: Global", delay: 700, logType: "info" },
        { desc: "[READ] HyperOS Version: 1.0.12.0.UNOMIXM", delay: 600, logType: "info" },
        { desc: "[AUTH] Requesting server-side Xiaomi Cloud bypass challenge key...", delay: 1200, logType: "warn" },
        { desc: "[CHALLENGE] Auth challenge solved: 0x992B104A", delay: 900, logType: "success" },
        { desc: "[WIPE] Sending payload: Format 'persist' & 'account' partition tables...", delay: 1100, logType: "info" },
        { desc: "[SIDELOAD] Mi Cloud configuration reset to factory state.", delay: 800, logType: "success" },
        { desc: "[CMD] Sending sideload reboot: ok", delay: 500, logType: "info" },
      ],
    });
  };

  // 3. MediaTek BROM Auth Bypass
  const handleMTKBromBypass = () => {
    executeRepairOperation({
      brand: "MediaTek",
      model: "Helio G80/G99 & Dimensity Series",
      action: "MTK_BROM_AUTH_BYPASS",
      chipset: "MT6768 / MT6877",
      mode: "BROM",
      cost: 5,
      steps: [
        { desc: "[BROM] Waiting for MTK USB Port (Hold Vol+ & Vol- and plug USB cable)...", delay: 900, logType: "warn" },
        { desc: "[BROM] Device connected on COM8 (MediaTek USB Port)", delay: 700, logType: "success" },
        { desc: "[HANDSHAKE] Sending Start Token: 0xA0 0x0A 0x50 0x05... OK", delay: 600, logType: "info" },
        { desc: "[CHIP] Hardware Code: 0x0768 | Target: MT6768", delay: 700, logType: "info" },
        { desc: "[SLA/DA] Exploiting Kamakiri / Amonet payload in BootROM memory...", delay: 1200, logType: "warn" },
        { desc: "[SLA/DA] SLA & DAA Signature Verification Disabled!", delay: 800, logType: "success" },
        { desc: "[DA] Loading Custom Download Agent (DA_PL.bin)...", delay: 900, logType: "info" },
        { desc: "[EMMC] Reading Partition Table GPT... Found 64 partitions", delay: 800, logType: "info" },
        { desc: "[FORMAT] Formatting FRP partition (0x0000000002D00000 - 0x00100000)... OK", delay: 900, logType: "success" },
      ],
    });
  };

  // 4. Qualcomm EDL 9008 Sahara Flash
  const handleQualcommEDL = () => {
    executeRepairOperation({
      brand: "Qualcomm",
      model: "Snapdragon 8 Gen 2 / 7s Gen 2",
      action: "QUALCOMM_EDL_SAHARA_FRP",
      chipset: "SM8550 / SM7435",
      mode: "EDL_9008",
      cost: 10,
      steps: [
        { desc: "[EDL] Checking Qualcomm HS-USB QDLoader 9008 port on COM22...", delay: 700 },
        { desc: "[SAHARA] Sending Hello Packet (Command 0x01)...", delay: 800, logType: "info" },
        { desc: "[SAHARA] Sahara Protocol Version: 2.0 | Handshake ACK received", delay: 700, logType: "success" },
        { desc: "[FIREHOSE] Selecting Programmer: prog_firehose_ddr_sm8550.elf", delay: 900, logType: "info" },
        { desc: "[SAHARA] Uploading Firehose programmer (Size: 421,800 bytes)...", delay: 1100, logType: "info" },
        { desc: "[FIREHOSE] Firehose Executing. Handshake XML ping: 'configure rawmode=false'...", delay: 800, logType: "info" },
        { desc: "[STORAGE] Target Memory Type: UFS 4.0 | Storage Capacity: 256 GB", delay: 700, logType: "info" },
        { desc: "[GPT] Reading GUID Partition Table from LUN0...", delay: 900, logType: "info" },
        { desc: "[ERASE] Erasing partition 'frp' (Sector: 0x1A400)... OK", delay: 800, logType: "success" },
        { desc: "[FIREHOSE] Sending power command: 'reset'...", delay: 600, logType: "info" },
      ],
    });
  };

  // Mode changer
  const handleScanPorts = () => {
    appendLog("[PORTS] Scanning active Windows COM / Serial devices...", "info");
    setTimeout(() => {
      appendLog("[PORTS] Found 4 ports: COM1 (Serial), COM14 (Samsung Mobile USB), COM8 (MTK Preloader), COM22 (Qualcomm 9008)", "success");
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100 font-sans select-none border border-slate-800">
      {/* 1. WINDOWS TITLE BAR */}
      <div className="flex items-center justify-between bg-[#060910] border-b border-slate-800/80 px-3 py-1.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-cyan-400 to-blue-600">
            <Flame className="h-3.5 w-3.5 text-black" />
          </div>
          <span className="font-bold text-white tracking-wider">
            Phoenix Service Tool v1.8.5 [PRO EDITION] - 2026.11
          </span>
          <span className="rounded bg-cyan-950 px-1.5 py-0.2 text-[9px] text-cyan-400 border border-cyan-800">
            WHQL BUILD
          </span>
        </div>

        {/* Windows Controls Simulation */}
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-white p-1">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button className="text-slate-500 hover:text-white p-1">
            <Square className="h-3 w-3" />
          </button>
          <button className="text-slate-500 hover:text-red-400 p-1">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 2. SUB-HEADER: SERVER STATUS & TECHNICIAN ACCOUNT */}
      <div className="flex flex-wrap items-center justify-between bg-[#0c1220] border-b border-border px-4 py-2 text-xs font-mono">
        <div className="flex items-center gap-4">
          {/* Server Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">SERVER:</span>
            <span className="font-bold text-emerald-400">{serverStatus} (PORT 3000)</span>
          </div>

          <span className="text-slate-700">|</span>

          {/* User & Credits */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">USER:</span>
            <span className="font-bold text-cyan-300">{currentUser.username}</span>
            <div className="flex items-center gap-1 rounded bg-amber-950/80 px-2 py-0.5 text-amber-300 border border-amber-800 font-bold">
              <Coins className="h-3 w-3" />
              {currentUser.credits} CR
            </div>
          </div>

          <span className="text-slate-700">|</span>

          {/* HWID */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400">
            <Laptop className="h-3 w-3 text-cyan-400" />
            <span>HWID: {currentUser.hwid}</span>
          </div>
        </div>

        {/* Right Switch: Simulation Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-300">
            <input
              type="checkbox"
              checked={simulationMode}
              onChange={(e) => setSimulationMode(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
            />
            <span className="font-mono text-cyan-400">
              Hardware Simulator: {simulationMode ? "ACTIVE" : "LIVE USB"}
            </span>
          </label>

          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white text-[11px] font-mono"
          >
            Web Portal <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* 3. HARDWARE CONNECTION & PORT TOOLBAR */}
      <div className="bg-[#0e1628] border-b border-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          {/* COM Port Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">PORT:</span>
            <select
              value={comPort}
              onChange={(e) => setComPort(e.target.value)}
              className="rounded bg-slate-900 border border-slate-700 px-2.5 py-1 text-cyan-300 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            >
              <option value="COM14">COM14 (Samsung Mobile USB Modem)</option>
              <option value="COM22">COM22 (Qualcomm HS-USB QDLoader 9008)</option>
              <option value="COM8">COM8 (MediaTek Preloader USB VCOM)</option>
              <option value="COM1">COM1 (Standard Serial Port)</option>
            </select>
            <button
              onClick={handleScanPorts}
              className="rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-slate-300 flex items-center gap-1"
              title="Rescan COM Ports"
            >
              <RefreshCw className="h-3 w-3" /> Scan
            </button>
          </div>

          {/* Baud Rate */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">BAUD:</span>
            <select
              value={baudRate}
              onChange={(e) => setBaudRate(e.target.value)}
              className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-slate-300 text-xs focus:outline-none"
            >
              <option value="115200">115200</option>
              <option value="921600">921600 (High Speed)</option>
              <option value="57600">57600</option>
            </select>
          </div>

          {/* Connection Mode Badge */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">DEVICE STATE:</span>
            <span className="rounded bg-emerald-950 px-2.5 py-1 font-bold text-emerald-400 border border-emerald-800">
              CONNECTED ({deviceMode})
            </span>
          </div>
        </div>

        {/* Quick Mode Switches */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setDeviceMode("FASTBOOT");
              appendLog("[CMD] Rebooting device to Fastboot mode...", "warn");
            }}
            className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[11px] text-slate-300 hover:border-slate-500"
          >
            Reboot Fastboot
          </button>
          <button
            onClick={() => {
              setDeviceMode("EDL_9008");
              appendLog("[CMD] Sending Qualcomm EDL 9008 reboot command...", "warn");
            }}
            className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[11px] text-purple-300 hover:border-purple-500"
          >
            Reboot EDL 9008
          </button>
          <button
            onClick={() => {
              setDeviceMode("MTP");
              appendLog("[CMD] Normal system reboot sent.", "info");
            }}
            className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[11px] text-cyan-300 hover:border-cyan-500"
          >
            Reboot Normal
          </button>
        </div>
      </div>

      {/* 4. MAIN WORKSPACE: SPLIT LEFT (TABS) & RIGHT (CONSOLE) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: BRAND WORKSPACE TABS */}
        <div className="w-1/2 lg:w-7/12 flex flex-col border-r border-border bg-[#0a0f1d] overflow-y-auto">
          {/* Tab Navigation Headers */}
          <div className="flex border-b border-border bg-[#070b14] px-2 text-xs font-mono">
            {[
              { id: "samsung", label: "SAMSUNG", color: "text-blue-400" },
              { id: "xiaomi", label: "XIAOMI / POCO", color: "text-orange-400" },
              { id: "mtk", label: "MEDIATEK", color: "text-emerald-400" },
              { id: "qualcomm", label: "QUALCOMM (EDL)", color: "text-purple-400" },
              { id: "device_mgr", label: "DEVICE MANAGER", color: "text-cyan-400" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? `border-cyan-400 bg-slate-900/90 ${tab.color}`
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <div className="p-5 flex-1 space-y-6">
            {/* TAB 1: SAMSUNG */}
            {activeTab === "samsung" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    Samsung Galaxy Servicing (MTP Modem / Odin Mode)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Supports Android 9 to 14+ including 2026 security patches. Connect phone in normal turned-on mode via USB.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={isRunning}
                    onClick={handleSamsungFRP}
                    className="flex flex-col items-start p-4 rounded-xl border border-cyan-500/50 bg-[#0c182e] hover:bg-[#0f203d] hover:border-cyan-400 transition-all text-left shadow-cyan group"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Remove FRP (2026 Patch)</span>
                      <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-800">
                        5 Credits
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      One-click FRP bypass for all Galaxy A, S, Z models. Automated dialer test mode handshake.
                    </p>
                  </button>

                  <button
                    disabled={isRunning}
                    onClick={() => {
                      appendLog("[MTP] Reading Samsung Model & CSC info...", "info");
                      setTimeout(() => {
                        appendLog("[INFO] Model: SM-A546E | Sales Code: INS | Knox: 0x0 | Android: 14", "success");
                      }, 600);
                    }}
                    className="flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-[#0c1220] hover:bg-slate-800/80 transition-all text-left"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Read Device Info (MTP)</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        FREE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Reads serial number, IMEI, CSC carrier code, Android build version, and Knox counter.
                    </p>
                  </button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      appendLog("[ODIN] Switching device to Odin Download Mode...", "info");
                      setTimeout(() => appendLog("[ODIN] Phone entered Download Mode.", "success"), 600);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 hover:text-white text-center font-mono"
                  >
                    Reboot Download Mode
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[CSC] Launching Samsung CSC region changer...", "info");
                      setTimeout(() => appendLog("[CSC] Supported CSCs: INS, XAA, BTU, THL, SER", "info"), 600);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 hover:text-white text-center font-mono"
                  >
                    Change CSC Region
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[FACTORY] Sending Master Clear Factory Reset AT Command...", "warn");
                      setTimeout(() => appendLog("[FACTORY] Userdata wiped successfully.", "success"), 800);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-red-300 hover:text-red-200 text-center font-mono"
                  >
                    Factory Reset (MTP)
                  </button>
                </div>

                {/* Odin Tar Flasher Box */}
                <div className="rounded-xl border border-slate-800 bg-[#080d18] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <HardDrive className="h-4 w-4 text-blue-400" /> Odin Tar.md5 Firmware Flasher
                    </span>
                    <span className="text-slate-500">Odin Protocol v3.14</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    {["BL File (Bootloader)", "AP File (System/Userdata)", "CP File (Modem)", "CSC File (Carrier Config)"].map(
                      (slot) => (
                        <div key={slot} className="flex items-center gap-2">
                          <span className="w-20 text-[11px] text-slate-400">{slot.split(" ")[0]}:</span>
                          <input
                            type="text"
                            readOnly
                            placeholder={`Select ${slot}...`}
                            className="flex-1 rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-400"
                          />
                          <button className="rounded bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] text-slate-300">
                            Browse
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: XIAOMI / POCO */}
            {activeTab === "xiaomi" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Cpu className="h-4 w-4 text-orange-400" />
                    Xiaomi, Redmi & POCO (HyperOS / MIUI Servicing)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sideload mode Mi Account reset, Fastboot partition manager, and EDL authorization.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={isRunning}
                    onClick={handleXiaomiMiAccount}
                    className="flex flex-col items-start p-4 rounded-xl border border-orange-500/50 bg-[#26130c] hover:bg-[#331a10] hover:border-orange-400 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Reset Mi Account (Sideload)</span>
                      <span className="rounded bg-orange-950 px-2 py-0.5 text-[10px] font-mono text-orange-400 border border-orange-800">
                        10 Credits
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Connect in Recovery Mode (Mi Assistant). Wipes lost cloud lock without relock.
                    </p>
                  </button>

                  <button
                    disabled={isRunning}
                    onClick={() => {
                      appendLog("[FASTBOOT] Sending Fastboot reboot-edl authorized token...", "warn");
                      setTimeout(() => appendLog("[EDL] Device switched to Qualcomm 9008 EDL Mode!", "success"), 900);
                    }}
                    className="flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-[#0c1220] hover:bg-slate-800/80 transition-all text-left"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Fastboot to EDL (Auth)</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        4 Credits
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Converts locked Fastboot mode into Emergency 9008 mode for deep unbricking.
                    </p>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      appendLog("[FASTBOOT] Reading Xiaomi Product Codename...", "info");
                      setTimeout(() => appendLog("[INFO] Product: garnet | Bootloader: Locked | Anti-rollback: 1", "info"), 500);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 font-mono"
                  >
                    Fastboot Read Info
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[OEM] Verifying OEM Unlock status...", "info");
                      setTimeout(() => appendLog("[OEM] Token: 0x9812A (Approved)", "success"), 600);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 font-mono"
                  >
                    Unlock Bootloader
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[EFS] Wiping modemst1 & modemst2...", "warn");
                      setTimeout(() => appendLog("[EFS] Baseband partition sanitized.", "success"), 700);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-orange-300 font-mono"
                  >
                    Wipe EFS / Fix IMEI
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: MEDIATEK (MTK) */}
            {activeTab === "mtk" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    MediaTek BROM SLA/DA Auth Bypass & Flasher
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bypass hardware authentication on Helio G, P, and Dimensity series without test point disassembling.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={isRunning}
                    onClick={handleMTKBromBypass}
                    className="flex flex-col items-start p-4 rounded-xl border border-emerald-500/50 bg-[#0a1e16] hover:bg-[#0d261c] hover:border-emerald-400 transition-all text-left shadow-emerald group"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">BROM Auth Bypass + FRP</span>
                      <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-800">
                        5 Credits
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Disables security SLA/DA checks in BootROM and wipes FRP + Userdata partitions safely.
                    </p>
                  </button>

                  <button
                    disabled={isRunning}
                    onClick={() => {
                      appendLog("[BROM] Reading MTK GPT Partitions...", "info");
                      setTimeout(() => appendLog("[GPT] Parsed 64 partitions (boot, recovery, super, nvram, frp)", "success"), 600);
                    }}
                    className="flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-[#0c1220] hover:bg-slate-800/80 transition-all text-left"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Read GPT Partition Table</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        FREE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Dumps memory layout, partition addresses, and block sizes directly over USB VCOM.
                    </p>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      appendLog("[NVRAM] Backing up nvram.img and nvdata.img...", "info");
                      setTimeout(() => appendLog("[NVRAM] Saved to backup/nvram_backup.bin", "success"), 800);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 font-mono"
                  >
                    Backup NVRAM / IMEI
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[RPMB] Reading RPMB counter: 0x00000004", "info");
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 font-mono"
                  >
                    Read RPMB Key
                  </button>
                  <button
                    onClick={() => {
                      appendLog("[DUMP] Dumping preloader.bin from eMMC boot1...", "info");
                      setTimeout(() => appendLog("[DUMP] Preloader dumped successfully.", "success"), 600);
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-xs text-emerald-300 font-mono"
                  >
                    Dump Preloader
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: QUALCOMM */}
            {activeTab === "qualcomm" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Laptop className="h-4 w-4 text-purple-400" />
                    Qualcomm Snapdragon EDL 9008 Sahara / Firehose
                  </h3>
                  <p className="text-xs text-slate-400">
                    Emergency Download (EDL 9008) low-level programming for Xiaomi, Samsung, Vivo, Oppo, and OnePlus.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={isRunning}
                    onClick={handleQualcommEDL}
                    className="flex flex-col items-start p-4 rounded-xl border border-purple-500/50 bg-[#1c0f2b] hover:bg-[#251438] hover:border-purple-400 transition-all text-left shadow-cyan group"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Sahara Handshake + FRP Wipe</span>
                      <span className="rounded bg-purple-950 px-2 py-0.5 text-[10px] font-mono text-purple-400 border border-purple-800">
                        10 Credits
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Connect via EDL Test Point. Automatically executes Firehose loader and wipes FRP partition.
                    </p>
                  </button>

                  <button
                    disabled={isRunning}
                    onClick={() => {
                      appendLog("[SAHARA] Sending Sahara Protocol Hello packet to COM22...", "info");
                      setTimeout(() => appendLog("[SAHARA] Handshake ACK received. Chipset: SM8550 (Snapdragon 8 Gen 2)", "success"), 600);
                    }}
                    className="flex flex-col items-start p-4 rounded-xl border border-slate-800 bg-[#0c1220] hover:bg-slate-800/80 transition-all text-left"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-white text-xs">Ping Sahara Mode</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        FREE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Verifies Qualcomm 9008 COM port response and validates driver handshake integrity.
                    </p>
                  </button>
                </div>

                {/* Firehose Loader Selection Box */}
                <div className="rounded-xl border border-slate-800 bg-[#080d18] p-4 space-y-3 font-mono text-xs">
                  <span className="text-white font-bold block">Firehose Programmer (.elf / .mbn)</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="[AUTO-DETECT]: prog_firehose_ddr_snapdragon_gen2.elf"
                      className="flex-1 rounded border border-slate-800 bg-slate-950 px-3 py-1.5 text-cyan-300 text-xs"
                    />
                    <button className="rounded bg-purple-950 border border-purple-800 px-3 py-1.5 text-purple-300 font-bold hover:bg-purple-900">
                      Auto Match
                    </button>
                    <button className="rounded bg-slate-800 border border-slate-700 px-3 py-1.5 text-slate-300">
                      Custom File...
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: DEVICE MANAGER */}
            {activeTab === "device_mgr" && (
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-cyan-400" />
                  Connected Hardware Ports & Driver Status
                </h3>
                <div className="space-y-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Samsung Mobile USB Modem</div>
                      <div className="text-[11px] text-slate-400">Port: COM14 | VID: 04E8 | PID: 6860</div>
                    </div>
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-800">
                      ACTIVE DRIVER
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Qualcomm HS-USB QDLoader 9008</div>
                      <div className="text-[11px] text-slate-400">Port: COM22 | VID: 05C6 | PID: 9008</div>
                    </div>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                      STANDBY
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">MediaTek Preloader USB VCOM Port</div>
                      <div className="text-[11px] text-slate-400">Port: COM8 | VID: 0E8D | PID: 2000</div>
                    </div>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                      STANDBY
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME COLOR-CODED EXECUTION CONSOLE */}
        <div className="w-1/2 lg:w-5/12 flex flex-col bg-black border-l border-slate-800">
          {/* Console Header Bar */}
          <div className="flex items-center justify-between bg-[#070b14] border-b border-slate-800 px-3 py-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span className="font-bold text-white">EXECUTION LOG CONSOLE</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearLogs}
                className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1"
                title="Clear Logs"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            </div>
          </div>

          {/* Progress Bar (Visible during operation) */}
          {isRunning && (
            <div className="bg-[#0b1220] border-b border-slate-800 p-2.5 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <span className="animate-spin h-2 w-2 rounded-full border border-cyan-400 border-t-transparent"></span>
                  {currentStep || "Processing Operation..."}
                </span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-300 shadow-cyan"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Scrollable Terminal Output */}
          <div className="flex-1 p-3 overflow-y-auto space-y-1 font-mono text-[11px] leading-relaxed text-slate-300 select-text">
            {logs.map((log) => {
              let color = "text-slate-300";
              if (log.type === "success") color = "text-emerald-400 font-bold";
              if (log.type === "warn") color = "text-amber-400";
              if (log.type === "error") color = "text-red-400 font-bold";
              if (log.type === "cloud") color = "text-cyan-400";

              return (
                <div key={log.id} className={`${color} break-all`}>
                  {log.text}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>

          {/* Terminal Footer Info */}
          <div className="bg-[#070b14] border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Encoding: UTF-8 / Raw Byte Stream</span>
            <span>Phoenix Client Engine v1.8.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

