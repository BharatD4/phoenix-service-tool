"use client";

import { useState } from "react";
import { Users, Globe, MessageSquare, Send, CheckCircle2, ArrowLeft, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ResellersPage() {
  const [resellers] = useState([
    {
      id: "res-1",
      name: "GSM Server International",
      country: "United Arab Emirates (Dubai / Middle East)",
      whatsapp: "+971501234567",
      telegram: "@gsmserver_official",
      website: "https://gsmserver.com",
      paymentMethods: "USDT (TRC20), Binance Pay, Wire Transfer, Visa/Mastercard",
      tier: "PRIMARY DISTRIBUTOR",
      badge: "Diamond Partner",
    },
    {
      id: "res-2",
      name: "India GSM Hub & Dongle Central",
      country: "India (South Asia)",
      whatsapp: "+919876543210",
      telegram: "@indiagsmhub",
      website: "https://indiagsmhub.in",
      paymentMethods: "UPI, Google Pay, PhonePe, Paytm, IMPS, Crypto (USDT)",
      tier: "OFFICIAL DISTRIBUTOR",
      badge: "Fast Auto Delivery",
    },
    {
      id: "res-3",
      name: "UnlockRiver Reseller Americas",
      country: "United States / Latin America",
      whatsapp: "+14155552671",
      telegram: "@unlockriver_credits",
      website: "https://unlockriver.com",
      paymentMethods: "PayPal, Zelle, CashApp, USDT, Bitcoin",
      tier: "VIP RESELLER",
      badge: "Instant Topup",
    },
    {
      id: "res-4",
      name: "Europe Mobile Tools Distributor",
      country: "Germany / United Kingdom / EU",
      whatsapp: "+491512345678",
      telegram: "@euromobiletools",
      website: "https://euromobiletools.eu",
      paymentMethods: "SEPA Transfer, Revolut, Credit Card, USDT",
      tier: "OFFICIAL DISTRIBUTOR",
      badge: "Euro Payments",
    },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <Link href="/" className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 mb-2">
          <ArrowLeft className="h-3 w-3" /> Back to Home
        </Link>
        <h1 className="text-3xl font-black text-white">Official Global Resellers & Distributors</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Purchase verified Phoenix Service Tool credits safely through our authorized regional distributor network.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="text-xs leading-relaxed text-slate-300">
          <strong className="text-emerald-400 font-bold block mb-0.5">Scam Protection Guarantee:</strong>
          Only purchase credits from the verified contacts listed below. Never send funds to unverified Telegram channels or social media groups. All official resellers deliver credits instantly to your registered technician username.
        </div>
      </div>

      {/* Reseller Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resellers.map((reseller) => (
          <div
            key={reseller.id}
            className="rounded-2xl border border-border bg-[#0b1120] p-6 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-cyan-950 border border-cyan-800 px-3 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                  {reseller.tier}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400">
                  <Sparkles className="h-3 w-3" /> {reseller.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{reseller.name}</h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                {reseller.country}
              </div>

              {/* Payment Methods */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 mb-4">
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> Accepted Payment Methods:
                </div>
                <div className="text-xs font-mono text-slate-300 font-medium">
                  {reseller.paymentMethods}
                </div>
              </div>
            </div>

            {/* Contact CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
              <a
                href={`https://wa.me/${reseller.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
              </a>

              <a
                href={`https://t.me/${reseller.telegram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 px-3 text-xs font-bold text-white transition-colors"
              >
                <Send className="h-3.5 w-3.5" /> Telegram
              </a>

              <a
                href={reseller.website}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 py-2.5 px-3 text-xs font-mono font-bold text-cyan-300 transition-colors"
              >
                Website
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Become a Reseller Section */}
      <div className="rounded-3xl border border-slate-800 bg-[#0c1427] p-8 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider">
          <Users className="h-4 w-4" /> Reseller Partnership Program
        </div>
        <h3 className="text-2xl font-bold text-white">Want to become an Authorized Phoenix Reseller?</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          We offer automated GSM API endpoints (compatible with DHRU Fusion, WebX, and custom e-commerce scripts) allowing you to sell credits seamlessly on your website with automatic delivery.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="https://t.me/phoenixservicetool_admin"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-2.5 text-xs font-bold text-black shadow-cyan hover:opacity-95"
          >
            Contact Master Admin on Telegram
          </a>
          <Link
            href="/dashboard/reseller"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-mono font-bold text-cyan-300 hover:bg-slate-800"
          >
            View GSM Server API Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

