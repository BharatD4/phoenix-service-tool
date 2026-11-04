import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";

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

    const devices = await prisma.supportedDevice.findMany({
      where,
      orderBy: { modelName: "asc" },
    });

    return NextResponse.json({ success: true, count: devices.length, devices });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

