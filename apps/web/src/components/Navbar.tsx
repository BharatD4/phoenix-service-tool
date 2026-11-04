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
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Server Status", href: "/#status" },
    { name: "Resellers", href: "/resellers" },
    { name: "Supported Models", href: "/models" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0d0824]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo matching Phoenix Image */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 p-0.5 shadow-md shadow-purple-500/25 transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#12082b]">
              <Flame className="h-4 w-4 text-rose-400" />
            </div>
          </div>
          <span className="font-bold tracking-tight text-white text-lg group-hover:text-purple-300 transition-colors">
            Phoenix
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "text-white bg-white/10 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs text-white hover:bg-white/20 transition-all"
              >
                <Coins className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-amber-300">{user.credits} CR</span>
                <span className="text-white/30">|</span>
                <span className="font-medium text-white">{user.username}</span>
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-500/30"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-full bg-white text-slate-900 px-4 py-2 text-xs font-bold hover:bg-slate-100 transition-all shadow-md shadow-purple-500/10"
              >
                Register
                <ChevronRight className="h-3.5 w-3.5" />
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
