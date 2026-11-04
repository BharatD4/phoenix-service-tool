"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent, customUser?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const targetUser = customUser || username;
    const targetPass = customPass || password;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: targetUser,
          password: targetPass,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    handleLogin(undefined, u, p);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Technician Portal Login</h1>
          <p className="text-xs text-slate-400">
            Sign in to manage your credits, bound HWID, and device operation logs.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="technician1"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating with Cloud..." : "Log In to Portal"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          <div className="text-[11px] font-medium text-slate-500 text-center uppercase tracking-wider">
            Quick 1-Click Demo Accounts
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => quickLogin("technician1", "tech123")}
              className="rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 p-2 text-center text-xs font-medium text-cyan-300 transition-colors"
            >
              Technician
            </button>
            <button
              onClick={() => quickLogin("reseller_gsm", "reseller123")}
              className="rounded-lg bg-white/[0.03] border border-white/10 hover:border-purple-500/40 p-2 text-center text-xs font-medium text-purple-300 transition-colors"
            >
              Reseller
            </button>
            <button
              onClick={() => quickLogin("admin", "admin123")}
              className="rounded-lg bg-white/[0.03] border border-white/10 hover:border-rose-500/40 p-2 text-center text-xs font-medium text-rose-300 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-1">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-cyan-400 hover:underline font-semibold">
            Create Account (+25 Credits)
          </Link>
        </div>
      </div>
    </div>
  );
}

