"use client";

import { useState, useEffect } from "react";
import { Users, ShieldAlert, Coins, RefreshCw, Cpu, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [operations, setOperations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchAdminData = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users || []);
          setOperations(data.recentOperations || []);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAdjustCredits = async (userId: string, amount: number) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ADJUST_CREDITS", userId, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`Adjusted credits: ${amount > 0 ? "+" : ""}${amount}`);
        fetchAdminData();
        setTimeout(() => setMsg(null), 3000);
      }
    } catch {}
  };

  const handleResetHWID = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "RESET_HWID", userId }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("User HWID reset successfully.");
        fetchAdminData();
        setTimeout(() => setMsg(null), 3000);
      }
    } catch {}
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "UPDATE_STATUS", userId, newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`User status updated to ${newStatus}`);
        fetchAdminData();
        setTimeout(() => setMsg(null), 3000);
      }
    } catch {}
  };

  const totalCredits = users.reduce((acc, u) => acc + (u.credits || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white">Master Cloud Administration</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global system management, technician licensing, and real-time security audit trails.
          </p>
        </div>
        <button
          onClick={fetchAdminData}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh Cloud
        </button>
      </div>

      {msg && (
        <div className="rounded-xl border border-cyan-500/50 bg-cyan-950/80 p-3 text-xs font-mono text-cyan-300 shadow-cyan">
          {msg}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-[#0b1120] p-5">
          <div className="text-xs font-mono uppercase text-slate-400">Total Registered Users</div>
          <div className="text-3xl font-black text-cyan-400 font-mono mt-1">{users.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-[#0b1120] p-5">
          <div className="text-xs font-mono uppercase text-slate-400">Credits In Circulation</div>
          <div className="text-3xl font-black text-amber-400 font-mono mt-1">{totalCredits}</div>
        </div>
        <div className="rounded-2xl border border-border bg-[#0b1120] p-5">
          <div className="text-xs font-mono uppercase text-slate-400">Total Unlock Operations</div>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-1">{operations.length}</div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="rounded-3xl border border-border bg-[#0b1120] p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-cyan-400" /> User Accounts & Hardware Licensing
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0e1628] text-[11px] uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">HWID Lock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{u.username}</span>
                    <span className="text-[10px] text-slate-500">{u.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-400">{u.credits} CR</td>
                  <td className="py-3 px-4 text-[10px] text-slate-400 truncate max-w-[150px]">
                    {u.hwid || <span className="text-slate-600">Unbound</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-red-950 text-red-400 border border-red-800"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleAdjustCredits(u.id, 50)}
                      className="rounded bg-cyan-950 px-2 py-1 text-[10px] font-bold text-cyan-300 border border-cyan-800 hover:bg-cyan-900"
                    >
                      +50 CR
                    </button>
                    <button
                      onClick={() => handleResetHWID(u.id)}
                      className="rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-slate-300 border border-slate-700 hover:border-slate-500"
                    >
                      Unbind HWID
                    </button>
                    <button
                      onClick={() => handleToggleStatus(u.id, u.status)}
                      className={`rounded px-2 py-1 text-[10px] font-bold border ${
                        u.status === "ACTIVE"
                          ? "bg-red-950/80 text-red-400 border-red-800 hover:bg-red-900"
                          : "bg-emerald-950/80 text-emerald-400 border-emerald-800 hover:bg-emerald-900"
                      }`}
                    >
                      {u.status === "ACTIVE" ? "Ban" : "Unban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

