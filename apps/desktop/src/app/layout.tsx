import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phoenix Service Tool v1.8.5 [PRO] - Windows Client",
  description: "Phoenix Service Tool Standalone Windows Client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}

