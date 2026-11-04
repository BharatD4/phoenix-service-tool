import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import CursorEffect from "@/components/CursorEffect";

export const metadata: Metadata = {
  title: "Phoenix Service Tool - Professional Mobile Servicing & Software Repair Hub",
  description:
    "Official website and cloud licensing hub for Phoenix Service Tool. Instant Samsung FRP bypass, Xiaomi Mi Account Sideload, Qualcomm EDL 9008 Sahara auth, and MediaTek BROM repair.",
  keywords: [
    "Phoenix Service Tool",
    "Samsung FRP 2026",
    "Xiaomi Mi Account bypass",
    "Qualcomm EDL 9008",
    "MTK BROM Auth",
    "GSM service tool",
    "mobile phone repair software",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col ambient-glow antialiased">
        <CursorEffect />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

