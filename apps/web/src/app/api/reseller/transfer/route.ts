import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resellerUsername, recipientUsername, amount } = await req.json();

    const transferAmount = parseInt(amount, 10);
    if (!transferAmount || transferAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid credit amount required" },
        { status: 400 }
      );
    }

    const reseller = await prisma.user.findUnique({
      where: { username: resellerUsername },
    });

    if (!reseller || (reseller.role !== "RESELLER" && reseller.role !== "ADMIN")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized reseller account" },
        { status: 403 }
      );
    }

    if (reseller.credits < transferAmount) {
      return NextResponse.json(
        { success: false, message: `Insufficient reseller inventory. Balance: ${reseller.credits}` },
        { status: 400 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { username: recipientUsername },
    });

    if (!recipient) {
      return NextResponse.json(
        { success: false, message: `Recipient user '${recipientUsername}' not found` },
        { status: 404 }
      );
    }

    // Atomic update
    const resellerNewBalance = reseller.credits - transferAmount;
    const recipientNewBalance = recipient.credits + transferAmount;

    await prisma.user.update({
      where: { id: reseller.id },
      data: { credits: resellerNewBalance },
    });

    await prisma.user.update({
      where: { id: recipient.id },
      data: { credits: recipientNewBalance },
    });

    // Record logs
    await prisma.creditTransaction.create({
      data: {
        userId: reseller.id,
        type: "TRANSFER",
        amount: -transferAmount,
        balanceAfter: resellerNewBalance,
        description: `Transferred to technician: ${recipient.username}`,
        reference: `TRF-OUT-${Date.now()}`,
      },
    });

    await prisma.creditTransaction.create({
      data: {
        userId: recipient.id,
        type: "TRANSFER",
        amount: transferAmount,
        balanceAfter: recipientNewBalance,
        description: `Received from Reseller: ${reseller.username}`,
        reference: `TRF-IN-${Date.now()}`,
      },
    });

    await prisma.resellerTransfer.create({
      data: {
        resellerId: reseller.id,
        recipientUsername: recipient.username,
        credits: transferAmount,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Transferred ${transferAmount} credits to ${recipient.username} successfully!`,
      resellerBalance: resellerNewBalance,
      recipientBalance: recipientNewBalance,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

