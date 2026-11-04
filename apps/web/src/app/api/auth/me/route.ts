import { prisma } from "@phoenix/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("pst_session")?.value;

    let user = null;
    if (sessionToken) {
      user = await prisma.user.findFirst({
        where: {
          OR: [{ id: sessionToken }, { username: sessionToken }],
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          credits: true,
          hwid: true,
          apiKey: true,
          status: true,
          createdAt: true,
        },
      });
    }

    if (!user) {
      // Default fallback technician for preview
      user = await prisma.user.findUnique({
        where: { username: "technician1" },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          credits: true,
          hwid: true,
          apiKey: true,
          status: true,
          createdAt: true,
        },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

