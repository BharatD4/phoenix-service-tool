"use client";

import { useState, useEffect } from "react";
import { Users, Send, Coins, Key, Code, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResellerDashboardPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(25);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/reseller/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resellerUsername: user?.username || "reseller_gsm",
          recipientUsername: recipient,
          amount,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Transfer failed");
      }

      setResult({ success: true, message: data.message });
      setRecipient("");
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 mb-2">
            <ArrowLeft className="h-3 w-3" /> Back to Technician Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white">Reseller & GSM API Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Wholesale credit distribution, sub-user replenishment, and DHRU Fusion automated server integration.
          </p>
        </div>
        <div className="rounded-xl border border-purple-500/50 bg-purple-950/40 px-4 py-2 text-xs font-mono text-purple-300">
          Role: <strong>VIP Reseller</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Credit Transfer Form */}
        <div className="lg:col-span-5 rounded-3xl border border-border bg-[#0b1120] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Instant Credit Transfer</h2>
          </div>
          <p className="text-xs text-slate-400">
            Send credits instantly to any registered technician username without waiting.
          </p>

          {result && (
            <div
              className={`rounded-xl border p-3.5 text-xs font-mono flex items-center gap-2 ${
                result.success
                  ? "border-emerald-500/40 bg-emerald-950/80 text-emerald-300"
                  : "border-red-500/40 bg-red-950/80 text-red-300"
              }`}
            >
              {result.success ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              {result.message}
            </div>
          )}

          <form onSubmit={handleTransfer} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 uppercase text-[11px] mb-1">
                Technician Username
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. technician1"
                className="w-full rounded-xl border border-border bg-slate-900 py-2.5 px-3.5 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase text-[11px] mb-1">
                Credit Amount
              </label>
              <input
                type="number"
                required
                min={1}
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                className="w-full rounded-xl border border-border bg-slate-900 py-2.5 px-3.5 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              {[10, 25, 50, 100].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] text-cyan-300 hover:border-cyan-400"
                >
                  +{v}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3 font-bold text-black shadow-cyan hover:opacity-95 transition-opacity"
            >
              {loading ? "Authorizing Transfer..." : `Transfer ${amount} Credits`}
            </button>
          </form>
        </div>

        {/* Right Column: DHRU Fusion GSM Server API Documentation */}
        <div className="lg:col-span-7 rounded-3xl border border-border bg-[#0b1120] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">DHRU Fusion & WebX GSM API</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connect your own GSM reseller website or server script to automatically deliver Phoenix Service Tool credits to your customers upon checkout.
          </p>

          <div className="space-y-4 font-mono text-xs">
            {/* Endpoint 1 */}
            <div className="rounded-xl bg-black/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="rounded bg-blue-950 px-2 py-0.5 text-blue-400 font-bold border border-blue-800">
                  POST /api/reseller/transfer
                </span>
                <span className="text-slate-500">Auto Credit Topup</span>
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto">
{`// Payload Example
{
  "resellerUsername": "reseller_gsm",
  "recipientUsername": "customer_tech",
  "amount": 50
}`}
              </pre>
            </div>

            {/* Endpoint 2: Tool Handshake */}
            <div className="rounded-xl bg-black/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-emerald-400 font-bold border border-emerald-800">
                  POST /api/tool/handshake
                </span>
                <span className="text-slate-500">Client HWID & Auth</span>
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto">
{`// Desktop Tool Connect Example
{
  "username": "customer_tech",
  "hwid": "HWID-A49F-83CD-9011-B7E2",
  "toolVersion": "v1.8.5"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

