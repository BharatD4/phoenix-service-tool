import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

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

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: password,
        role: "TECHNICIAN",
        credits: 25, // 25 Welcome credits for technicians!
        apiKey: "pst_live_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
        status: "ACTIVE",
      },
    });

    // Create welcome credit transaction
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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

