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
  User,
  Mail,
  Lock,
  ArrowRight,
  Search,
  Check,
  Info,
} from "lucide-react";

export default function DesktopToolApp() {
  // Authentication State (Shows Dialog from Image 1 if false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  // Form inputs
  const [username, setUsername] = useState("VIKASH KI DUNIYA 2026");
  const [email, setEmail] = useState("VIKASHKIDUNIYA@GMAIL.COM");
  const [password, setPassword] = useState("123456");
  const [authStatus, setAuthStatus] = useState("User registered successfully.");
  const [authStatusType, setAuthStatusType] = useState<"success" | "error">("success");

  // Main Tool State (Image 2 - Version 8.2.3)
  const [userCredits, setUserCredits] = useState(5.48);
  const [activeBrand, setActiveBrand] = useState("XIAOMI");
  const [activeSubTab, setActiveSubTab] = useState("Fastboot");
  const [usbPort, setUsbPort] = useState("Android Interface ( 9b01005930533036340033dc58422c )");
  const [autoDetect, setAutoDetect] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState("XIAOMI MTK V5 AUTH");
  const [memType, setMemType] = useState<"MEM" | "UFS">("MEM");
  const [selectedModel, setSelectedModel] = useState("# Auto Model");
  const [loaderFile, setLoaderFile] = useState("Default_Auth_DA_v8.2.3.bin");
  const [progress, setProgress] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);

  // Terminal Logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Loading User Information...OK",
    "Username        : SHRESHTHMOBILE",
    "Credit          : 5.48",
    "",
    "Loading Server Information...OK",
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  // Handle Login or Register from Image 1
  const handleAuth = (type: "login" | "register") => {
    if (!username.trim()) {
      setAuthStatusType("error");
      setAuthStatus("Please enter a valid UserName.");
      return;
    }

    setAuthStatusType("success");
    if (type === "register") {
      setAuthStatus("User registered successfully. Launching Tool...");
      setUserCredits(25.00); // 25 free credits on register
    } else {
      setAuthStatus("Login successful. Initializing Phoenix Engine...");
      setUserCredits(5.48); // default credits from screenshot
    }

    setTimeout(() => {
      setIsAuthenticated(true);
      setTerminalLogs([
        "Loading User Information...OK",
        `Username        : ${username.toUpperCase()}`,
        `Credit          : ${type === "register" ? "25.00" : "5.48"}`,
        "",
        "Loading Server Information...OK",
      ]);
    }, 900);
  };

  // Server functions list matching screenshot
  const serverFunctions = [
    { name: "GUATEMALA MI ACC UNLOCK", credit: "10", status: "ONLINE" },
    { name: "OPLUS DEMO REMOVE", credit: "1", status: "ONLINE" },
    { name: "OPLUS SECRECY DECRYPT", credit: "0", status: "FREE" },
    { name: "REALME SALES SUPPORT", credit: "5", status: "ONLINE" },
    { name: "TRANSSION ANTI CRACK", credit: "10", status: "ONLINE" },
    { name: "TRANSSION AUTH", credit: "2", status: "ONLINE" },
    { name: "XIAOMI ASSISTANT FRP", credit: "3", status: "ONLINE" },
    { name: "XIAOMI FASTBOT TO EDL", credit: "0.5", status: "ONLINE" },
    { name: "XIAOMI INDIA UBL UNLOCK", credit: "1", status: "ONLINE" },
    { name: "XIAOMI MTK V5 AUTH", credit: "5", status: "ONLINE" },
    { name: "XIAOMI MTK V6 AUTH", credit: "5", status: "ONLINE" },
    { name: "XIAOMI PREMIUM CHECKER", credit: "0.25", status: "ONLINE" },
    { name: "XIAOMI QC AUTH FLASH", credit: "5", status: "ONLINE" },
  ];

  const handleExecute = (actionTitle: string, cost: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProgress(15);

    setTerminalLogs((prev) => [
      ...prev,
      "",
      `[ACTION] Starting: ${actionTitle}...`,
      `[PORT] Querying ${usbPort}...`,
    ]);

    setTimeout(() => {
      setProgress(55);
      setTerminalLogs((prev) => [
        ...prev,
        `[INFO] Handshake verified. Protocol response: 0x9008_OK.`,
        `[AUTH] Validating cloud token with Phoenix Server...`,
      ]);
    }, 700);

    setTimeout(() => {
      setProgress(100);
      setIsProcessing(false);
      if (cost > 0) {
        setUserCredits((prev) => Math.max(0, +(prev - cost).toFixed(2)));
      }
      setTerminalLogs((prev) => [
        ...prev,
        `[CREDIT] Server balance updated. Cost: ${cost} CR.`,
        `[SUCCESS] ${actionTitle} completed successfully!`,
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-center items-center p-3 font-sans select-none">
      
      {/* ============================================================== */}
      {/* 1. AUTHENTICATION WINDOW (Exact Match to Image 1: Register)     */}
      {/* ============================================================== */}
      {!isAuthenticated && (
        <div className="w-full max-w-[560px] bg-[#14151a] rounded-lg border border-[#2b2d38] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Window Titlebar */}
          <div className="h-8 bg-[#1f2129] px-3 flex items-center justify-between border-b border-[#2b2d38]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />
              <span className="text-xs font-medium text-slate-300">
                Phoenix Service Tool - {authMode === "register" ? "Register" : "Login"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="cursor-pointer hover:text-white text-xs">−</span>
              <span className="cursor-pointer hover:text-white text-xs">▢</span>
              <span className="cursor-pointer hover:text-red-400 text-xs">✕</span>
            </div>
          </div>

          <div className="p-7 space-y-6">
            {/* Header: PHOENIX SERVICE TOOL */}
            <div className="text-center py-1">
              <div className="inline-block bg-[#0e0f14] px-6 py-1.5 rounded border border-[#2b2d38]/60 shadow-inner">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white">PHOENIX </span>
                <span className="text-xl sm:text-2xl font-black tracking-wider text-[#facc15]">SERVICE </span>
                <span className="text-xl sm:text-2xl font-black tracking-wider text-[#ef4444]">TOOL</span>
              </div>
            </div>

            {/* Fieldset / Group: Register */}
            <div className="rounded-xl border border-[#2e313d] bg-[#181a20] p-6 space-y-4">
              <div className="text-xs text-slate-400 -mt-8 bg-[#181a20] px-2 w-max border-l border-r border-[#2e313d]">
                {authMode === "register" ? "Register" : "Login"}
              </div>

              {/* UserName Input */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#38bdf8] sm:w-36">UserName</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-[#101116] border border-[#2e313d] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#38bdf8] shadow-inner"
                  placeholder="Enter Username"
                />
              </div>

              {/* Email Address Input */}
              {authMode === "register" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-sm font-bold text-[#facc15] sm:w-36">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#101116] border border-[#2e313d] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#facc15] shadow-inner"
                    placeholder="Enter Email Address"
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#38bdf8] sm:w-36">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-[#101116] border border-[#2e313d] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#38bdf8] shadow-inner"
                  placeholder="Enter Password"
                />
              </div>

              {/* Action Buttons: Login / Register (Pill shaped with neon purple border) */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    handleAuth("login");
                  }}
                  className="flex items-center gap-2 rounded-full border border-[#a855f7] bg-[#22242d] hover:bg-[#2c2f3b] px-6 py-2.5 text-sm font-bold text-white transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="w-4 h-4 rounded border border-purple-400 flex items-center justify-center text-[10px] text-purple-300">
                    ➔
                  </div>
                  Login
                </button>

                <button
                  onClick={() => {
                    setAuthMode("register");
                    handleAuth("register");
                  }}
                  className="flex items-center gap-2 rounded-full border border-[#a855f7] bg-[#22242d] hover:bg-[#2c2f3b] px-6 py-2.5 text-sm font-bold text-white transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="w-4 h-4 rounded border border-purple-400 flex items-center justify-center text-[10px] text-purple-300">
                    +
                  </div>
                  Register
                </button>
              </div>
            </div>

            {/* Bottom Status Message (Green text) */}
            <div className={`text-xs font-bold ${authStatusType === "success" ? "text-[#22c55e]" : "text-red-400"}`}>
              {authStatus}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MAIN TOOL WINDOW (Exact Match to Image 2: Version 8.2.3)     */}
      {/* ============================================================== */}
      {isAuthenticated && (
        <div className="w-full max-w-[1100px] bg-[#12141a] rounded-xl border border-[#282b36] shadow-2xl overflow-hidden flex flex-col text-xs animate-in fade-in duration-300">
          
          {/* Main Titlebar: Phoenix Service Tool [ Version 8.2.3 ] */}
          <div className="h-8 bg-[#181a22] px-4 flex items-center justify-between border-b border-[#242731]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-200">
                Phoenix Service Tool [ Version 8.2.3 ]
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[10px] text-slate-400 hover:text-cyan-400 px-2 py-0.5 rounded bg-slate-800"
              >
                Logout / Switch Account
              </button>
              <Minus className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              <Square className="w-3 h-3 cursor-pointer hover:text-white" />
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" />
            </div>
          </div>

          {/* Top Bar: USB Interface & Brand Tabs */}
          <div className="p-3 bg-[#15171f] border-b border-[#242731] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* USB Groupbox */}
            <div className="rounded-lg border border-[#2e323e] bg-[#111318] p-2 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">USB</span>
              <select
                value={usbPort}
                onChange={(e) => setUsbPort(e.target.value)}
                className="bg-[#1b1d25] border border-[#2d303c] rounded px-3 py-1.5 text-xs text-[#38bdf8] font-mono focus:outline-none max-w-[320px] truncate"
              >
                <option value="Android Interface ( 9b01005930533036340033dc58422c )">
                  Android Interface ( 9b01005930533036340033dc58422c )
                </option>
                <option value="Qualcomm HS-USB QDLoader 9008 ( COM14 )">
                  Qualcomm HS-USB QDLoader 9008 ( COM14 )
                </option>
                <option value="MediaTek PreLoader USB VCOM ( COM9 )">
                  MediaTek PreLoader USB VCOM ( COM9 )
                </option>
              </select>

              <button
                onClick={() => setAutoDetect(!autoDetect)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                  autoDetect
                    ? "bg-[#064e3b] text-[#34d399] border-[#059669]"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${autoDetect ? "bg-[#34d399] animate-pulse" : "bg-slate-500"}`} />
                Auto
              </button>

              <button
                onClick={() => {
                  setTerminalLogs((prev) => [...prev, `[USB] Rescanned ports. Found 1 connected Android interface.`]);
                }}
                className="p-1.5 rounded bg-[#1e202a] border border-[#2d303c] text-slate-300 hover:text-white hover:bg-[#282a36]"
                title="Rescan USB Ports"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Brand Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["HMD", "SAMSUNG", "OPLUS", "XIAOMI", "HONOR", "TRANSSION", "History", "Account"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-3 py-2 rounded-lg font-bold text-xs transition-all border ${
                    activeBrand === brand
                      ? "bg-[#1e3a8a] text-[#38bdf8] border-[#38bdf8] shadow-md shadow-blue-900/30"
                      : "bg-[#181a22] text-slate-300 border-[#2b2e3b] hover:bg-[#222530] hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Main Work Area: Left Status Pane + Right Setting / Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 bg-[#0d0f14] flex-1">
            
            {/* LEFT PANE: Terminal, User Info & Server Functions List */}
            <div className="lg:col-span-5 bg-[#101217] rounded-xl border border-[#222530] p-3 flex flex-col justify-between space-y-3">
              <div>
                {/* Active Function Header (Green) */}
                <div className="text-[#22c55e] font-black text-xs pb-1 tracking-wide border-b border-[#1c1f28]">
                  FUNCTION : {activeBrand} BOOTLOADER UNLOCK
                </div>

                {/* User Info & Terminal Output */}
                <div className="font-mono text-[11px] text-slate-300 pt-2 space-y-1">
                  {terminalLogs.slice(0, 5).map((line, i) => (
                    <div key={i} className="leading-tight text-slate-300">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Function Credits & Status Table */}
              <div className="bg-[#0b0c10] rounded border border-[#1c1f26] p-2 max-h-[300px] overflow-y-auto space-y-1 font-mono text-[11px]">
                {serverFunctions.map((fn, idx) => {
                  const isSelected = selectedFunction === fn.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedFunction(fn.name)}
                      className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#1e40af] text-white font-bold"
                          : "text-[#facc15] hover:bg-[#181a22]"
                      }`}
                    >
                      <span className="truncate pr-2">{fn.name}</span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-slate-300 text-[10px]">Credit: {fn.credit}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded ${
                            fn.status === "FREE"
                              ? "bg-purple-900/60 text-purple-300"
                              : isSelected
                              ? "bg-cyan-400 text-black font-bold"
                              : "bg-[#064e3b] text-[#34d399]"
                          }`}
                        >
                          {fn.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra log tail */}
              {terminalLogs.length > 5 && (
                <div className="bg-[#08090c] rounded p-2 border border-[#1a1c24] font-mono text-[10px] text-cyan-300 space-y-1 max-h-[90px] overflow-y-auto">
                  {terminalLogs.slice(5).map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              )}
            </div>

            {/* RIGHT PANE: Settings & Action Buttons */}
            <div className="lg:col-span-7 bg-[#101217] rounded-xl border border-[#222530] p-4 flex flex-col justify-between space-y-4">
              
              {/* Setting Group */}
              <div className="rounded-xl border border-[#272a36] bg-[#14161d] p-4 space-y-3">
                <div className="text-xs font-semibold text-slate-400">Setting</div>

                {/* Model Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-[#d946ef] font-bold text-xs w-20">Model</span>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="flex-1 bg-[#1c1e27] border border-[#2d303d] rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="# Auto Model"># Auto Model</option>
                    <option value="Xiaomi Redmi Note 13 Pro 5G (garnet)">Xiaomi Redmi Note 13 Pro 5G (garnet)</option>
                    <option value="Xiaomi 14 / 14 Pro (houji/shennong)">Xiaomi 14 / 14 Pro (houji/shennong)</option>
                    <option value="Samsung Galaxy S24 Ultra (SM-S928B)">Samsung Galaxy S24 Ultra (SM-S928B)</option>
                    <option value="Samsung Galaxy A54 5G (SM-A546E)">Samsung Galaxy A54 5G (SM-A546E)</option>
                  </select>
                </div>

                {/* Loader / DA Picker */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[#22c55e] font-bold text-xs w-20">Loader / DA</span>
                  <input
                    type="text"
                    value={loaderFile}
                    readOnly
                    className="flex-1 min-w-[180px] bg-[#1c1e27] border border-[#2d303d] rounded px-3 py-1.5 text-xs text-slate-300 font-mono"
                  />
                  <button className="px-2.5 py-1.5 rounded bg-[#252834] border border-[#353846] text-white hover:bg-[#323646] font-bold">
                    ...
                  </button>

                  <div className="flex items-center gap-3 pl-2">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#38bdf8] font-bold">
                      <input
                        type="radio"
                        checked={memType === "MEM"}
                        onChange={() => setMemType("MEM")}
                        name="mem"
                      />
                      MEM
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#38bdf8] font-bold">
                      <input
                        type="radio"
                        checked={memType === "UFS"}
                        onChange={() => setMemType("UFS")}
                        name="mem"
                      />
                      UFS
                    </label>
                  </div>
                </div>

                {/* Sub Mode Tabs: Flash, Service, Fastboot, Mi Assistant, EFS, Utility */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#222532]">
                  {["Flash", "Service", "Fastboot", "Mi Assistant", "EFS", "Utility"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSubTab(tab)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all border ${
                        activeSubTab === tab
                          ? "bg-[#1e3a8a] text-[#38bdf8] border-[#38bdf8]"
                          : "bg-[#1b1d26] text-slate-300 border-[#292c3a] hover:bg-[#252836]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Action Buttons (Exact Match to Screenshot) */}
              <div className="space-y-3 py-2">
                <button
                  onClick={() => handleExecute("Read Info [ Fastboot Mode ]", 0)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-[#a855f7] bg-[#1a1c24] hover:bg-[#252834] text-white font-bold text-sm shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <div className="w-5 h-5 rounded-full border border-purple-400 flex items-center justify-center text-purple-300 text-xs">
                    i
                  </div>
                  Read Info [ Fastboot Mode ]
                </button>

                <button
                  onClick={() => handleExecute("Fastboot To EDL", 0.5)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-[#a855f7] bg-[#1a1c24] hover:bg-[#252834] text-white font-bold text-sm shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <div className="w-5 h-5 rounded-full border border-purple-400 flex items-center justify-center text-purple-300 text-xs">
                    🔄
                  </div>
                  Fastboot To EDL
                </button>

                <button
                  onClick={() => handleExecute("Bootloader Unlock [ Fastboot Mode ]", 1.0)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-[#a855f7] bg-[#1a1c24] hover:bg-[#252834] text-white font-bold text-sm shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  <div className="w-5 h-5 rounded-full border border-purple-400 flex items-center justify-center text-purple-300 text-xs">
                    🔒
                  </div>
                  Bootloader Unlock [ Fastboot Mode ]
                </button>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-[#1e212b] pt-2">
                <span>Selected Port: <strong className="text-white">COM14</strong></span>
                <span>Security Engine: <strong className="text-emerald-400">2026 WHQL Ready</strong></span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Progress 100% | User Name : SHRESHTHMOBILE | Credit : 5.48 */}
          <div className="h-9 bg-[#15171f] px-4 border-t border-[#242731] flex items-center justify-between text-xs">
            {/* Progress Bar & Percentage */}
            <div className="flex items-center gap-3 w-1/3">
              <div className="flex-1 bg-[#222530] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38bdf8] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-bold text-[#38bdf8] text-[11px]">{progress}%</span>
            </div>

            {/* User Name */}
            <div className="text-center">
              <span className="font-bold text-white">
                User Name : <span className="text-[#38bdf8]">{username.toUpperCase()}</span>
              </span>
            </div>

            {/* Credit Balance */}
            <div className="text-right">
              <span className="font-bold text-[#38bdf8]">
                Credit : {userCredits.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
