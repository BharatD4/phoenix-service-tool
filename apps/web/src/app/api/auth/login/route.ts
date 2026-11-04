import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";
import { memoryUserStore } from "@/lib/userStore";

export async function POST(req: Request) {
  try {
    const { username, password, hwid } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password required" },
        { status: 400 }
      );
    }

    let user: any = null;

    try {
      user = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email: username }],
        },
      });

      if (user && hwid && !user.hwid) {
        await prisma.user.update({
          where: { id: user.id },
          data: { hwid },
        });
      }
    } catch (dbErr) {
      console.warn("Prisma fallback activated for login:", dbErr);
      user = memoryUserStore.findUser(username);
      if (user && hwid && !user.hwid) {
        user = memoryUserStore.updateUser(user.id, { hwid });
      }
    }

    if (!user || user.passwordHash !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.status === "BANNED") {
      return NextResponse.json(
        { success: false, message: "Account has been suspended by Administrator" },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        credits: user.credits,
        hwid: user.hwid || hwid,
        apiKey: user.apiKey,
      },
    });

    response.cookies.set("pst_session", user.id, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
