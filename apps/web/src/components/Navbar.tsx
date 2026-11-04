"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Flame, 
  Download, 
  Coins, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight
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
    { name: "Features", href: "/#features" },
    { name: "Supported Models", href: "/models" },
    { name: "Downloads & Drivers", href: "/downloads" },
    { name: "Official Resellers", href: "/resellers" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base group-hover:text-cyan-400 transition-colors">
                PHOENIX
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400 border border-cyan-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                v1.8.5
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
              Service Tool & Repair Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick link to download setup */}
          <a
            href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
            download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            Download Tool
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500/50 transition-colors"
              >
                <Coins className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-amber-300">{user.credits} CR</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300 font-medium">{user.username}</span>
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-lg bg-red-950/60 border border-red-800/80 px-2.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/60"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-semibold text-black hover:opacity-95 transition-opacity shadow-sm shadow-cyan-500/20"
              >
                Get Started
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="/downloads/Phoenix_Service_Tool_Setup_v1.8.5.exe"
              download="Phoenix_Service_Tool_Setup_v1.8.5.exe"
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 py-2.5 text-xs font-semibold text-slate-200"
            >
              <Download className="h-4 w-4 text-cyan-400" />
              Download Setup v1.8.5 (.exe)
            </a>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-bold text-black"
            >
              Technician Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
