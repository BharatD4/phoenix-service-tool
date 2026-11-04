# ⚡ Phoenix Service Tool (Full-Stack GSM Servicing & Repair Ecosystem)

A complete, production-grade GSM Servicing & Mobile Software Repair platform inspired by [phoenixservicetool.com](https://phoenixservicetool.com). 
It features a **Cloud Web Licensing Portal** and a **Standalone Windows Desktop Utility Client**, integrated via an encrypted cloud credit and hardware ID (HWID) verification engine.

---

## 🏗️ Architecture & Monorepo Structure

```
phoenix-service-tool/
├── apps/
│   ├── web/               # Next.js 15 Web Portal & Cloud Licensing Hub (Port 3000)
│   │   ├── src/app/
│   │   │   ├── page.tsx               # High-tech Cyberpunk Landing Page with 3D tool mockup
│   │   │   ├── models/page.tsx        # Searchable Supported Models & Chipsets Matrix
│   │   │   ├── downloads/page.tsx     # Setup v1.8.5 (.exe), WHQL USB Drivers & Changelogs
│   │   │   ├── resellers/page.tsx     # Official Global Resellers & Distributors Directory
│   │   │   ├── login/page.tsx         # Technician Authentication with 1-Click Demo Logins
│   │   │   ├── register/page.tsx      # Technician Registration (+25 Free Welcome Credits)
│   │   │   ├── dashboard/page.tsx     # Technician Portal (Credits, HWID Lock, Audit Logs)
│   │   │   ├── dashboard/reseller/    # Reseller Portal (Bulk Transfer, DHRU GSM API)
│   │   │   ├── admin/page.tsx         # Master Admin Control (User Bans, Credit Adjustments)
│   │   │   └── api/                   # Cloud Endpoints (Handshake, Verification, Complete)
│   └── desktop/           # Windows Desktop Client Simulator (Port 3001)
│       └── src/app/page.tsx           # Multi-Brand Servicing Client (Samsung, Xiaomi, MTK, Qualcomm)
├── packages/
│   └── db/                # Prisma ORM + SQLite / PostgreSQL Schema & Migrations
│       ├── prisma/schema.prisma
│       ├── prisma/seed.ts             # Realistic GSM Seed Database (Samsung S24, Xiaomi, MTK, etc.)
│       └── dev.db                     # Active Local SQLite Database
```

---

## 🚀 Quick Start Guide

### 1. Run the Web Platform (Port 3000)
```bash
# In phoenix-service-tool root
pnpm dev:web
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser:
* **Landing Page**: Real-time status, 180+ supported devices, driver downloads, and pricing.
* **Technician Dashboard**: Real-time server credit wallet, bound HWID status, and operation logs.
* **Reseller Portal**: Credit transfer to sub-users and DHRU Fusion API docs.
* **Admin Control Panel**: Full management of all user balances, HWID unbinding, and audit logs.

### 2. Run the Windows Desktop Client (Port 3001)
```bash
# In phoenix-service-tool root
pnpm dev:desktop
```
Open **[http://localhost:3001](http://localhost:3001)**:
* Authentic Windows-style dark GSM interface with minimize/maximize/close title bar.
* Live COM Port detection (`COM14 - Samsung Mobile USB`, `COM22 - Qualcomm 9008`, `COM8 - MTK Preloader`).
* Real-time color-coded terminal log with live byte streams and progress tracking.
* **Samsung Tab**: One-Click MTP FRP Bypass (2026 Patch / Android 9–14+), Read Info, Odin Flasher.
* **Xiaomi / POCO Tab**: Recovery Assistant Sideload Mi Account reset, Fastboot-to-EDL 9008 handshake.
* **MediaTek (MTK) Tab**: BootROM (BROM) SLA/DA Auth Bypass, Partition GPT Dumper, Safe Format FRP.
* **Qualcomm Tab**: Sahara Protocol Handshake, Firehose Programmer Auto-detect, Partition Eraser.
* **Live Cloud Handshake**: Verifies technician credits on the web server and deducts credits atomically upon operation completion!

### 3. Run Both Concurrently
```bash
pnpm dev
```

---

## 🔑 Default Test Accounts (Pre-Seeded)

| Role | Username | Password | Default Credits | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Technician** | `technician1` | `tech123` | **85 CR** | Device unlocks, HWID binding, operation logs |
| **Reseller** | `reseller_gsm` | `reseller123` | **3,500 CR** | Wholesale credit transfers, DHRU GSM API |
| **Master Admin** | `admin` | `admin123` | **10,000 CR** | Full system control, manual credit adjustments, user bans |

*(The login page at `/login` also features instant 1-click login buttons for testing!)*

---

## 🛡️ Cloud API Endpoints for Desktop Tool & GSM Servers

* **`POST /api/tool/handshake`**: Verifies technician credentials, binds HWID, and checks tool version.
* **`POST /api/tool/verify-operation`**: Checks credit cost, confirms balance, and issues a single-use authorization token.
* **`POST /api/tool/complete-operation`**: Atomically deducts credits from the technician's cloud wallet and logs device operation.
* **`POST /api/reseller/transfer`**: DHRU Fusion / WebX GSM API compatible credit distribution endpoint.
* **`POST /api/credits/topup`**: Instant recharge simulation for technicians.

