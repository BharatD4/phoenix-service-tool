"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Flame, 
  Cpu, 
  Download, 
  Users, 
  Terminal, 
  ShieldCheck, 
  Coins, 
  Menu, 
  X,
  ExternalLink
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const navLinks = [
    { name: "Features", href: "/#features", icon: Cpu },
    { name: "Supported Models", href: "/models", icon: ShieldCheck },
    { name: "Downloads & Drivers", href: "/downloads", icon: Download },
    { name: "Official Resellers", href: "/resellers", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-[#080c14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan transition-transform group-hover:scale-105">
            <Flame className="h-6 w-6 text-black animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-lg group-hover:text-cyan-400 transition-colors">
                PHOENIX
              </span>
              <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-800">
                PRO v1.8.5
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
              Service Tool & Repair Hub
            </p>
          </div>
        </Link>

        {/* Server Status Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-900/60 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] font-medium">SERVER: ONLINE (2026 PATCH READY)</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {/* Direct link to Launch Desktop App */}
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all shadow-cyan"
          >
            <Terminal className="h-3.5 w-3.5" />
            Launch Desktop Tool
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-1.5 text-xs font-mono text-slate-200 hover:border-cyan-500 transition-colors"
              >
                <Coins className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-bold text-amber-300">{user.credits}</span>
                <span className="text-slate-400 text-[10px]">CR</span>
                <span className="text-slate-500">|</span>
                <span className="text-cyan-400">{user.username}</span>
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-lg bg-red-950/80 border border-red-800 px-2.5 py-1.5 text-xs font-mono font-bold text-red-300 hover:bg-red-900"
                >
                  ADMIN
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-black hover:opacity-90 transition-opacity shadow-cyan"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-[#0b1120] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400"
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-950/80 border border-cyan-800 py-2 text-xs font-mono font-bold text-cyan-300"
            >
              <Terminal className="h-4 w-4" />
              Launch Desktop Tool
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-lg bg-cyan-500 py-2 text-xs font-bold text-black"
            >
              Technician Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

