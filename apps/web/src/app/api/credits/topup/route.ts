import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, username, amount } = await req.json();

    const creditAmount = parseInt(amount, 10);
    if (!creditAmount || creditAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid credit amount required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: userId ? { id: userId } : { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const newCredits = user.credits + creditAmount;

    await prisma.user.update({
      where: { id: user.id },
      data: { credits: newCredits },
    });

    await prisma.creditTransaction.create({
      data: {
        userId: user.id,
        type: "PURCHASE",
        amount: creditAmount,
        balanceAfter: newCredits,
        description: `Instant Recharge: +${creditAmount} Credits`,
        reference: "SIM-" + Math.floor(100000 + Math.random() * 900000),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully added ${creditAmount} credits!`,
      newCredits,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

