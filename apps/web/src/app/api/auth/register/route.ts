import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";
import { memoryUserStore } from "@/lib/userStore";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    let newUser = null;

    // Try Prisma DB first
    try {
      const existing = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, message: "Username or email is already registered" },
          { status: 400 }
        );
      }

      newUser = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash: password,
          role: "TECHNICIAN",
          credits: 25, // 25 Welcome credits for technicians
          apiKey: "pst_live_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
          status: "ACTIVE",
        },
      });

      try {
        await prisma.creditTransaction.create({
          data: {
            userId: newUser.id,
            type: "PURCHASE",
            amount: 25,
            balanceAfter: 25,
            description: "Welcome Technician Bonus Credits",
            reference: "PROMO-WELCOME",
          },
        });
      } catch {}
    } catch (dbErr) {
      // Prisma Query Engine unavailable or read-only filesystem (Vercel Serverless)
      console.warn("Prisma fallback activated for register:", dbErr);

      const memExisting = memoryUserStore.findUser(username) || memoryUserStore.findUser(email);
      if (memExisting) {
        return NextResponse.json(
          { success: false, message: "Username or email is already registered" },
          { status: 400 }
        );
      }

      newUser = memoryUserStore.createUser({
        username,
        email,
        passwordHash: password,
        role: "TECHNICIAN",
        credits: 25,
        apiKey: "pst_live_" + Math.random().toString(36).substring(2, 15),
        status: "ACTIVE",
        hwid: null,
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Account registered successfully with 25 bonus credits!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        credits: newUser.credits,
        apiKey: newUser.apiKey,
      },
    });

    response.cookies.set("pst_session", newUser.id, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to register" },
      { status: 500 }
    );
  }
}
