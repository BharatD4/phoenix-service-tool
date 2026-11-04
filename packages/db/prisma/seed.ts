import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Phoenix Service Tool Database...");

  // Clean old records
  await prisma.deviceOperation.deleteMany({});
  await prisma.creditTransaction.deleteMany({});
  await prisma.resellerTransfer.deleteMany({});
  await prisma.supportedDevice.deleteMany({});
  await prisma.toolRelease.deleteMany({});
  await prisma.driverPackage.deleteMany({});
  await prisma.officialReseller.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Users
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@phoenixservicetool.com",
      passwordHash: "admin123", // For simplicity in dev seed
      role: "ADMIN",
      credits: 10000,
      apiKey: "pst_live_adm_9918239081290312",
      status: "ACTIVE",
      hwid: "HWID-MASTER-ADMIN-NODE-01",
      notes: "Primary Root Administrator Account",
    },
  });

  const reseller = await prisma.user.create({
    data: {
      username: "reseller_gsm",
      email: "reseller@gsmhub.net",
      passwordHash: "reseller123",
      role: "RESELLER",
      credits: 3500,
      apiKey: "pst_live_res_4481902381209381",
      status: "ACTIVE",
      hwid: "HWID-RES-B739-1102-88EF-7A91",
      notes: "VIP Authorized Tier-1 Reseller",
    },
  });

  const tech = await prisma.user.create({
    data: {
      username: "technician1",
      email: "tech1@phonerepairs.com",
      passwordHash: "tech123",
      role: "TECHNICIAN",
      credits: 85,
      apiKey: "pst_live_usr_7718290381029311",
      status: "ACTIVE",
      hwid: "HWID-A49F-83CD-9011-B7E2",
      notes: "Senior Mobile Software Technician",
    },
  });

  // 2. Transactions & Operations for Technician
  await prisma.creditTransaction.createMany({
    data: [
      {
        userId: tech.id,
        type: "PURCHASE",
        amount: 100,
        balanceAfter: 100,
        description: "Recharge 100 Credits via Reseller (reseller_gsm)",
        reference: "TXN-88492019",
      },
      {
        userId: tech.id,
        type: "DEDUCTION",
        amount: -5,
        balanceAfter: 95,
        description: "Samsung Galaxy A54 5G - One Click FRP Reset (MTP)",
        reference: "JOB-910283",
      },
      {
        userId: tech.id,
        type: "DEDUCTION",
        amount: -10,
        balanceAfter: 85,
        description: "Xiaomi Redmi Note 13 Pro - Mi Account Sideload Reset",
        reference: "JOB-910344",
      },
    ],
  });

  await prisma.deviceOperation.createMany({
    data: [
      {
        userId: tech.id,
        brand: "Samsung",
        model: "Galaxy A54 5G (SM-A546E)",
        action: "SAMSUNG_FRP_MTP",
        chipset: "Exynos 1380",
        mode: "MTP",
        creditsDeducted: 5,
        status: "SUCCESS",
        hwid: "HWID-A49F-83CD-9011-B7E2",
        ipAddress: "152.58.12.94",
        logDetails: "Bypass FRP via AT-Command. Security patch: 2026-08. Status: OK.",
      },
      {
        userId: tech.id,
        brand: "Xiaomi",
        model: "Redmi Note 13 Pro+ (Zircon)",
        action: "XIAOMI_MI_ACCOUNT",
        chipset: "MediaTek Dimensity 7200-Ultra",
        mode: "SIDELOAD",
        creditsDeducted: 10,
        status: "SUCCESS",
        hwid: "HWID-A49F-83CD-9011-B7E2",
        ipAddress: "152.58.12.94",
        logDetails: "Read Mi Assistant info -> Wipe Account Partition -> Reboot. Done.",
      },
    ],
  });

  // 3. Supported Devices Database
  await prisma.supportedDevice.createMany({
    data: [
      // Samsung
      {
        brand: "Samsung",
        modelName: "Galaxy S24 Ultra",
        modelCode: "SM-S928B",
        chipset: "Snapdragon 8 Gen 3",
        supportedModes: "MTP, Download Mode, ADB",
        features: "MTP FRP 2026, Read CSC, Factory Reset, Odin Flashing",
        creditCost: 10,
        status: "SUPPORTED",
      },
      {
        brand: "Samsung",
        modelName: "Galaxy A54 5G",
        modelCode: "SM-A546B / SM-A546E",
        chipset: "Exynos 1380",
        supportedModes: "MTP, Download Mode, EUB Mode",
        features: "Instant FRP Bypass, KG Lock Check, Firmware Flash, CSC Change",
        creditCost: 5,
        status: "SUPPORTED",
      },
      {
        brand: "Samsung",
        modelName: "Galaxy A14 / A14 5G",
        modelCode: "SM-A145F / SM-A146P",
        chipset: "MediaTek Helio G80 / Dimensity 700",
        supportedModes: "MTP, BROM, Download Mode",
        features: "BROM Auth Bypass, One-Click FRP, Partition Erase",
        creditCost: 5,
        status: "SUPPORTED",
      },
      // Xiaomi / Redmi / POCO
      {
        brand: "Xiaomi",
        modelName: "Redmi Note 13 Pro 5G",
        modelCode: "Garnet",
        chipset: "Snapdragon 7s Gen 2",
        supportedModes: "Fastboot, EDL 9008, Sideload",
        features: "Mi Account Bypass (Sideload), Fastboot to EDL, Bootloader Unlock Check",
        creditCost: 8,
        status: "SUPPORTED",
      },
      {
        brand: "Xiaomi",
        modelName: "POCO X6 Pro 5G",
        modelCode: "Duchamp",
        chipset: "MediaTek Dimensity 8300-Ultra",
        supportedModes: "Fastboot, BROM Preloader, Sideload",
        features: "Sideload Mi Cloud Reset, Factory Reset, Fix Null IMEI",
        creditCost: 8,
        status: "SUPPORTED",
      },
      {
        brand: "Xiaomi",
        modelName: "Xiaomi 13 / 13 Pro",
        modelCode: "Fuxi / Nuwa",
        chipset: "Snapdragon 8 Gen 2",
        supportedModes: "Fastboot, EDL, Sideload",
        features: "EDL Auth Flashing, Global ROM Flash, FRP Reset",
        creditCost: 12,
        status: "SUPPORTED",
      },
      // Transsion (Tecno, Infinix, itel)
      {
        brand: "Tecno",
        modelName: "Camon 30 Premier 5G",
        modelCode: "CL9",
        chipset: "MediaTek Dimensity 8200 Ultimate",
        supportedModes: "BROM, Preloader, Fastboot",
        features: "One-Click MDM / FRP Reset, Read/Write RPMB, Scatter Flash",
        creditCost: 4,
        status: "SUPPORTED",
      },
      {
        brand: "Infinix",
        modelName: "Note 40 Pro+ 5G",
        modelCode: "X6851B",
        chipset: "MediaTek Dimensity 7020",
        supportedModes: "BROM, Fastboot, Preloader",
        features: "Direct FRP Remove, Wipe Userdata, Fix Bootloop",
        creditCost: 4,
        status: "SUPPORTED",
      },
      // Nokia / HMD
      {
        brand: "Nokia",
        modelName: "Nokia G22 / G42 5G",
        modelCode: "TA-1528 / TA-1581",
        chipset: "Unisoc T606 / Snapdragon 480+",
        supportedModes: "Fastboot, EDL, BROM",
        features: "Factory Reset + FRP, Firmware Repair, Read PAC/NB0",
        creditCost: 5,
        status: "SUPPORTED",
      },
      // Vivo
      {
        brand: "Vivo",
        modelName: "Vivo V29 / V30 5G",
        modelCode: "V2250 / V2318",
        chipset: "Snapdragon 778G / Snapdragon 7 Gen 3",
        supportedModes: "Fastboot, EDL 9008, TestPoint",
        features: "EDL Auth FRP, Demo Mode Unlock, User Lock Wipe",
        creditCost: 10,
        status: "SUPPORTED",
      },
    ],
  });

  // 4. Tool Releases
  await prisma.toolRelease.create({
    data: {
      version: "v1.8.5",
      fileName: "Phoenix_Service_Tool_Setup_v1.8.5.exe",
      fileSize: "148.4 MB",
      downloadUrl: "https://dl.phoenixservicetool.com/release/Phoenix_Service_Tool_Setup_v1.8.5.exe",
      checksumSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      changelog: `[v1.8.5 RELEASE NOTES]
- Added: Samsung 2026 Security Patch MTP FRP Reset (All Models)
- Added: Xiaomi HyperOS 2.0 Sideload Mi Account reset support
- Added: Qualcomm Firehose auto-detection for Snapdragon 8 Gen 2 / 8 Gen 3
- Improved: MediaTek BROM SLA/DA bypass speed increased by 40%
- Fixed: Windows 11 24H2 USB driver compatibility issue
- Added: Automatic COM Port scanning and baud rate negotiation`,
      isLatest: true,
      isMandatory: false,
    },
  });

  // 5. Driver Packages
  await prisma.driverPackage.createMany({
    data: [
      {
        name: "Qualcomm QDLoader 9008 USB Drivers (v2.1.2.2)",
        category: "Qualcomm",
        version: "2.1.2.2 (x64 / x86)",
        fileSize: "18.2 MB",
        downloadUrl: "https://dl.phoenixservicetool.com/drivers/Qualcomm_QDLoader_9008_Driver_x64.zip",
        description: "Official WHQL signed drivers for Qualcomm Emergency Download (EDL 9008) mode.",
      },
      {
        name: "MediaTek MTK USB Preloader & VCOM Drivers",
        category: "MediaTek",
        version: "v1.0.8",
        fileSize: "12.5 MB",
        downloadUrl: "https://dl.phoenixservicetool.com/drivers/MTK_USB_All_Drivers_v1.0.8.zip",
        description: "High-speed USB VCOM & BROM drivers for Helio and Dimensity chipsets.",
      },
      {
        name: "Samsung Smart Switch & Mobile USB Driver",
        category: "Samsung",
        version: "v1.7.59.0",
        fileSize: "36.8 MB",
        downloadUrl: "https://dl.phoenixservicetool.com/drivers/SAMSUNG_USB_Driver_for_Mobile_Phones.exe",
        description: "Official Samsung Electronics USB drivers for MTP, ADB, and Odin Download Mode.",
      },
      {
        name: "LibUSB-Win32 Filter Driver (Universal BROM Auth)",
        category: "LibUSB",
        version: "1.2.6.0",
        fileSize: "4.1 MB",
        downloadUrl: "https://dl.phoenixservicetool.com/drivers/libusb-win32-devel-filter-1.2.6.0.exe",
        description: "Required for MediaTek SLA/DA authentication bypass in BootROM state.",
      },
    ],
  });

  // 6. Official Resellers
  await prisma.officialReseller.createMany({
    data: [
      {
        name: "GSM Server International",
        country: "United Arab Emirates (Dubai)",
        whatsapp: "+971501234567",
        telegram: "@gsmserver_official",
        website: "https://gsmserver.com",
        paymentMethods: "USDT (TRC20), Binance Pay, Wire Transfer, Visa/Mastercard",
        tier: "OFFICIAL_DISTRIBUTOR",
      },
      {
        name: "India GSM Hub & Dongle Central",
        country: "India",
        whatsapp: "+919876543210",
        telegram: "@indiagsmhub",
        website: "https://indiagsmhub.in",
        paymentMethods: "UPI, Google Pay, PhonePe, Paytm, IMPS, Crypto",
        tier: "OFFICIAL_DISTRIBUTOR",
      },
      {
        name: "UnlockRiver Reseller Americas",
        country: "United States / Latin America",
        whatsapp: "+14155552671",
        telegram: "@unlockriver_credits",
        website: "https://unlockriver.com",
        paymentMethods: "PayPal, Zelle, CashApp, USDT, Bitcoin",
        tier: "VIP_RESELLER",
      },
      {
        name: "Europe Mobile Tools Distributor",
        country: "Germany / UK",
        whatsapp: "+491512345678",
        telegram: "@euromobiletools",
        website: "https://euromobiletools.eu",
        paymentMethods: "SEPA Transfer, Revolut, Credit Card, USDT",
        tier: "OFFICIAL_DISTRIBUTOR",
      },
    ],
  });

  console.log("Database seeded successfully with realistic GSM repair data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
