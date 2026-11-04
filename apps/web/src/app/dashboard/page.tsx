"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-300">
              {user?.role || "TECHNICIAN"} ACCOUNT
            </span>
            <span className="text-xs text-slate-400">ID: {user?.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Technician Control Panel</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back, <strong className="text-cyan-400">{user?.username}</strong>. Real-time license status & hardware bridge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tool"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
          >
            <Terminal className="h-4 w-4" />
            Launch Software Simulator
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {message && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-4 text-xs font-medium text-cyan-300 flex items-center gap-2 backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
          {message}
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Credit Balance */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Server Credit Balance
              </span>
              <Coins className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {user?.credits ?? 0}
              </span>
              <span className="text-sm font-semibold text-amber-400">Credits</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Each Samsung FRP or standard unlock consumes 4–10 credits upon verified success.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Quick Demo Recharge:</span>
            <button
              onClick={() => handleSimulateTopup(25)}
              className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              +25 CR
            </button>
            <button
              onClick={() => handleSimulateTopup(50)}
              className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              +50 CR
            </button>
          </div>
        </div>

        {/* Card 2: HWID PC Lock */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Bound Hardware ID (HWID)
              </span>
              <Laptop className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="my-2">
              <span className="text-xs font-mono text-emerald-400 font-bold block truncate">
                {user?.hwid || "Not Bound Yet (Binds upon 1st Tool Run)"}
              </span>
              <span className="text-[11px] text-slate-500">
                Motherboard & CPU Fingerprint
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your software license is tied to your primary workshop PC for anti-tamper security.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">Cooldown: Ready</span>
            <button
              onClick={handleResetHWID}
              className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 hover:border-rose-500/40 hover:text-rose-400 transition-colors"
            >
              Reset HWID
            </button>
          </div>
        </div>

        {/* Card 3: Personal API Key */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Technician API Key
              </span>
              <Key className="h-5 w-5 text-purple-400" />
            </div>
            <div className="my-2 rounded-xl bg-black/40 p-2.5 border border-white/5 flex items-center justify-between">
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
            <p className="text-xs text-slate-400 leading-relaxed">
              Used to authenticate desktop scripts or integration with your personal workshop CRM.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">Cloud Auth: Active</span>
            <span className="text-xs text-emerald-400 font-semibold">2026 TLS 1.3</span>
          </div>
        </div>
      </div>

      {/* Recent Device Operations History */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Live Phone Servicing & Unlock Operations</h3>
          </div>
          <button
            onClick={fetchUserData}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/5">
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
            <tbody className="divide-y divide-white/5 text-slate-300">
              {operations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No unlock operations logged yet. Launch the desktop client to service a device!
                  </td>
                </tr>
              ) : (
                operations.map((op) => (
                  <tr key={op.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-slate-400 text-xs">
                      {new Date(op.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {op.brand} {op.model}
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-medium">{op.action}</td>
                    <td className="py-3 px-4">
                      <span className="rounded-md bg-white/[0.04] border border-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                        {op.mode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{op.chipset || "N/A"}</td>
                    <td className="py-3 px-4 text-amber-400 font-semibold">
                      -{op.creditsDeducted} CR
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
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

