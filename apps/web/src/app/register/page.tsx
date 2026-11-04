"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Lock, User, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-border bg-[#0b1120] p-8 shadow-2xl shadow-cyan/10 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan">
            <Flame className="h-6 w-6 text-black" />
          </div>
          <h1 className="text-2xl font-black text-white">Create Technician Account</h1>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 px-3 py-1 text-[11px] font-mono text-emerald-300">
            <Sparkles className="h-3 w-3" /> Get 25 Free Welcome Credits!
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-xs text-red-300 flex items-center gap-2 font-mono">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tech_alex"
                className="w-full rounded-xl border border-border bg-slate-900/90 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@repairshop.com"
                className="w-full rounded-xl border border-border bg-slate-900/90 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
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
                className="w-full rounded-xl border border-border bg-slate-900/90 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 text-xs font-bold text-black shadow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Creating Account..." : "Register & Claim 25 Credits"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline font-bold">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

