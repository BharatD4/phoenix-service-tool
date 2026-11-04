import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";
import { INITIAL_SUPPORTED_DEVICES } from "@/lib/devicesData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const brand = searchParams.get("brand") || "";

    let devices: any[] = [];
    try {
      const where: any = {};
      if (brand && brand !== "ALL") {
        where.brand = { equals: brand };
      }
      if (search) {
        where.OR = [
          { modelName: { contains: search } },
          { modelCode: { contains: search } },
          { chipset: { contains: search } },
          { features: { contains: search } },
        ];
      }

      devices = await prisma.supportedDevice.findMany({
        where,
        orderBy: { modelName: "asc" },
      });
    } catch {
      // Prisma offline in serverless
    }

    // If database returned 0 (e.g. empty serverless DB), use high-fidelity fallback
    if (!devices || devices.length === 0) {
      devices = INITIAL_SUPPORTED_DEVICES.filter((d) => {
        const brandMatch = !brand || brand === "ALL" || d.brand.toUpperCase() === brand.toUpperCase();
        const searchMatch =
          !search ||
          d.modelName.toLowerCase().includes(search) ||
          d.modelCode.toLowerCase().includes(search) ||
          d.chipset.toLowerCase().includes(search) ||
          d.features.toLowerCase().includes(search);
        return brandMatch && searchMatch;
      });
    }

    return NextResponse.json({ success: true, count: devices.length, devices });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
