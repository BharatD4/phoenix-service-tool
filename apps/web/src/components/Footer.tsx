import Link from "next/link";
import { Flame, ShieldCheck, Download, Terminal, MessageSquare, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-[#060a10] text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                <Flame className="h-5 w-5 text-black" />
              </div>
              <span className="font-extrabold tracking-wider text-white text-lg">
                PHOENIX SERVICE TOOL
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier Windows mobile servicing software for authorized technicians. Instant FRP bypass, EDL 9008 Sahara auth, and BROM unlock for Android devices worldwide.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://t.me/phoenixservicetool"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-cyan-400 hover:border-cyan-500"
              >
                <Send className="h-3 w-3" />
                Telegram Channel
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-emerald-400 hover:border-emerald-500"
              >
                <MessageSquare className="h-3 w-3" />
                WhatsApp Help
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Platform & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/models" className="hover:text-cyan-400 transition-colors">
                  Supported Models & Test Points
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-cyan-400 transition-colors">
                  Download Setup v1.8.5 (.exe)
                </Link>
              </li>
              <li>
                <Link href="/downloads#drivers" className="hover:text-cyan-400 transition-colors">
                  Qualcomm & MTK USB Drivers
                </Link>
              </li>
              <li>
                <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                  Launch Desktop Client
                </a>
              </li>
            </ul>
          </div>

          {/* Resellers & Licensing */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Resellers & Credits
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resellers" className="hover:text-cyan-400 transition-colors">
                  Official Global Distributors
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Technician Account & HWID
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reseller" className="hover:text-cyan-400 transition-colors">
                  DHRU Fusion GSM API
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-400 transition-colors">
                  Technician Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Technician Notice
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Phoenix Service Tool is intended solely for legal repair, device maintenance, and data recovery by certified mobile technicians and device owners. Always verify customer ownership before servicing.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80">
              Build Version: 1.8.5-RELEASE-2026.11
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Phoenix Service Tool Team. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

