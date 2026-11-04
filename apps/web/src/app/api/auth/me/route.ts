import { prisma } from "@phoenix/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { memoryUserStore } from "@/lib/userStore";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("pst_session")?.value;

    let user: any = null;

    if (sessionToken) {
      try {
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
      } catch (err) {
        console.warn("Prisma fallback for me route:", err);
      }

      if (!user) {
        user = memoryUserStore.findUser(sessionToken);
      }
    }

    if (!user) {
      try {
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
      } catch {}

      if (!user) {
        user = memoryUserStore.findUser("technician1");
      }
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    const fallbackUser = memoryUserStore.findUser("technician1");
    return NextResponse.json({ success: true, user: fallbackUser });
  }
}
