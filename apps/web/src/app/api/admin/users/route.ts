import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        credits: true,
        hwid: true,
        status: true,
        apiKey: true,
        createdAt: true,
        _count: {
          select: {
            operations: true,
            transactions: true,
          },
        },
      },
    });

    const recentOperations = await prisma.deviceOperation.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    return NextResponse.json({ success: true, users, recentOperations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, userId, amount, newStatus, newRole } = await req.json();

    if (action === "ADJUST_CREDITS") {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

      const newCredits = Math.max(0, user.credits + parseInt(amount, 10));
      await prisma.user.update({
        where: { id: userId },
        data: { credits: newCredits },
      });

      await prisma.creditTransaction.create({
        data: {
          userId,
          type: "ADJUSTMENT",
          amount: parseInt(amount, 10),
          balanceAfter: newCredits,
          description: "Administrative credit adjustment",
          reference: "ADMIN-ADJ",
        },
      });

      return NextResponse.json({ success: true, message: "Credits updated", newCredits });
    }

    if (action === "RESET_HWID") {
      await prisma.user.update({
        where: { id: userId },
        data: { hwid: null, hwidLastReset: new Date() },
      });
      return NextResponse.json({ success: true, message: "HWID unlinked successfully" });
    }

    if (action === "UPDATE_STATUS") {
      await prisma.user.update({
        where: { id: userId },
        data: { status: newStatus },
      });
      return NextResponse.json({ success: true, message: `Status updated to ${newStatus}` });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

