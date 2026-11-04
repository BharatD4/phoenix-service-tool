"use client";

import { useState, useEffect } from "react";
import {
  Coins,
  Cpu,
  Laptop,
  Terminal,
  Key,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw,
  PlusCircle,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [operations, setOperations] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const fetchUserData = () => {
    setLoading(true);
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          // Fetch admin or user operations
          return fetch("/api/admin/users");
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((adminData) => {
        if (adminData && adminData.success) {
          setOperations(adminData.recentOperations || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSimulateTopup = async (amount: number) => {
    if (!user) return;
    try {
      const res = await fetch("/api/credits/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Successfully recharged ${amount} credits!`);
        fetchUserData();
        setTimeout(() => setMessage(null), 4000);
      }
    } catch {}
  };

  const handleResetHWID = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESET_HWID", userId: user.id }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("HWID reset successful! You may now connect a new PC.");
        fetchUserData();
        setTimeout(() => setMessage(null), 4000);
      }
    } catch {}
  };

  const copyApiKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  if (loading && !user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-400 font-mono text-sm">
        Connecting to Phoenix Cloud Server...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-800">
              {user?.role || "TECHNICIAN"} ACCOUNT
            </span>
            <span className="text-xs font-mono text-slate-400">ID: {user?.id}</span>
          </div>
          <h1 className="text-3xl font-black text-white">Technician Control Panel</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back, <strong className="text-cyan-400">{user?.username}</strong>. Real-time license status & hardware bridge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2.5 text-xs font-mono font-bold text-black shadow-cyan hover:opacity-95"
          >
            <Terminal className="h-4 w-4" />
            Launch Windows Client
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {message && (
        <div className="rounded-xl border border-cyan-500/50 bg-cyan-950/80 p-4 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-cyan">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Credit Balance */}
        <div className="rounded-2xl border border-cyan-500/40 bg-[#0b1324] p-6 shadow-cyan flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Server Credit Balance
              </span>
              <Coins className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-black text-white font-mono">
                {user?.credits ?? 0}
              </span>
              <span className="text-sm font-mono text-amber-400 font-bold">Credits</span>
            </div>
            <p className="text-xs text-slate-400">
              Each Samsung FRP or standard unlock consumes 4–10 credits upon verified success.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400">Quick Recharge (Demo):</span>
            <button
              onClick={() => handleSimulateTopup(25)}
              className="rounded bg-cyan-950 px-2.5 py-1 text-[11px] font-mono font-bold text-cyan-300 border border-cyan-800 hover:bg-cyan-900"
            >
              +25 CR
            </button>
            <button
              onClick={() => handleSimulateTopup(50)}
              className="rounded bg-cyan-950 px-2.5 py-1 text-[11px] font-mono font-bold text-cyan-300 border border-cyan-800 hover:bg-cyan-900"
            >
              +50 CR
            </button>
          </div>
        </div>

        {/* Card 2: HWID PC Lock */}
        <div className="rounded-2xl border border-border bg-[#0b1120] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Bound Hardware ID (HWID)
              </span>
              <Laptop className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="my-2">
              <span className="text-xs font-mono text-emerald-400 font-bold block truncate">
                {user?.hwid || "Not Bound Yet (Binds upon 1st Tool Run)"}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Motherboard & CPU Fingerprint
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Your software license is tied to your primary workshop PC for anti-tamper security.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">Cooldown: Ready</span>
            <button
              onClick={handleResetHWID}
              className="rounded bg-slate-900 px-3 py-1 text-[11px] font-mono font-bold text-slate-300 border border-slate-700 hover:border-red-400 hover:text-red-400 transition-colors"
            >
              Reset HWID
            </button>
          </div>
        </div>

        {/* Card 3: Personal API Key */}
        <div className="rounded-2xl border border-border bg-[#0b1120] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Technician API Key
              </span>
              <Key className="h-5 w-5 text-purple-400" />
            </div>
            <div className="my-2 rounded bg-black/80 p-2 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 truncate max-w-[200px]">
                {user?.apiKey || "pst_live_..."}
              </span>
              <button
                onClick={copyApiKey}
                className="text-cyan-400 hover:text-cyan-300 ml-2"
                title="Copy API Key"
              >
                {copiedKey ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Used to authenticate headless desktop scripts or integration with your personal workshop CRM.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">Cloud Auth: Active</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">2026 TLS 1.3</span>
          </div>
        </div>
      </div>

      {/* Recent Device Operations History */}
      <div className="rounded-3xl border border-border bg-[#0b1120] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Live Phone Servicing & Unlock Operations</h3>
          </div>
          <button
            onClick={fetchUserData}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0e1628] text-[11px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Brand & Model</th>
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Chipset</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {operations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No unlock operations logged yet. Launch the desktop client to service a device!
                  </td>
                </tr>
              ) : (
                operations.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(op.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {op.brand} {op.model}
                    </td>
                    <td className="py-3 px-4 text-cyan-300">{op.action}</td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                        {op.mode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{op.chipset || "N/A"}</td>
                    <td className="py-3 px-4 text-amber-400 font-bold">
                      -{op.creditsDeducted} CR
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800">
                        {op.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

