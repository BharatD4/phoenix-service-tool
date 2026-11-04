import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const releases = await prisma.toolRelease.findMany({
      orderBy: { releaseDate: "desc" },
    });

    const drivers = await prisma.driverPackage.findMany({
      orderBy: { category: "asc" },
    });

    return NextResponse.json({
      success: true,
      latestRelease: releases.find((r) => r.isLatest) || releases[0],
      releases,
      drivers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

