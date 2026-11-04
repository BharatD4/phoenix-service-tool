import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password, apiKey, hwid, toolVersion } = await req.json();

    if (!hwid) {
      return NextResponse.json(
        { success: false, message: "HWID (Hardware ID) is required for tool connection" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: apiKey ? { apiKey } : { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User account not found on Phoenix Cloud Server" },
        { status: 404 }
      );
    }

    if (password && user.passwordHash !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.status === "BANNED") {
      return NextResponse.json(
        { success: false, message: "Your account or HWID has been blocked by Administrator" },
        { status: 403 }
      );
    }

    // Check or bind HWID
    if (!user.hwid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { hwid },
      });
    } else if (user.hwid !== hwid) {
      return NextResponse.json(
        {
          success: false,
          message: `HWID Mismatch! Registered HWID: ${user.hwid.slice(0, 8)}... Please request a HWID reset from the Technician Web Portal.`,
        },
        { status: 403 }
      );
    }

    // Fetch latest release
    const latestRelease = await prisma.toolRelease.findFirst({
      where: { isLatest: true },
    });

    return NextResponse.json({
      success: true,
      message: "Handshake verified with Phoenix Cloud Server",
      session: {
        userId: user.id,
        username: user.username,
        role: user.role,
        credits: user.credits,
        hwid: user.hwid || hwid,
        serverTime: new Date().toISOString(),
        serverStatus: "ONLINE",
        latestVersion: latestRelease?.version || "v1.8.5",
        updateRequired: latestRelease?.isMandatory && latestRelease?.version !== toolVersion,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

