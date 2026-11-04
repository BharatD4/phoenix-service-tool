import Link from "next/link";
import { Flame, Send, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070b13] text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                <Flame className="h-4 w-4 text-black" />
              </div>
              <span className="font-bold tracking-tight text-white text-base">
                PHOENIX SERVICE TOOL
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The modern Windows mobile servicing utility for professional technicians. One-click FRP bypass, EDL 9008 Sahara auth, and BROM unlock.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://t.me/phoenixservicetool"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-medium text-sky-400 hover:border-slate-700 transition-colors"
              >
                <Send className="h-3 w-3" />
                Telegram Channel
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:border-slate-700 transition-colors"
              >
                <MessageSquare className="h-3 w-3" />
                WhatsApp Help
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/models" className="hover:text-cyan-400 transition-colors">
                  Supported Models & Chipsets
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
                <Link href="/tool" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Desktop Client Simulator (Web)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resellers & Licensing */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Technician Notice
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Phoenix Service Tool is intended solely for legal repair, device maintenance, and data recovery by certified mobile technicians and device owners.
            </p>
            <div className="text-[11px] text-slate-400 font-medium">
              Build Version: 1.8.5-RELEASE-2026.11
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Phoenix Service Tool Team. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0 text-[11px]">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
