import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      username,
      brand,
      model,
      action,
      chipset,
      mode,
      creditsDeducted,
      status,
      hwid,
      logDetails,
    } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const cost = status === "SUCCESS" ? (creditsDeducted || 5) : 0;

    let updatedCredits = user.credits;
    if (cost > 0) {
      updatedCredits = Math.max(0, user.credits - cost);

      // Update user credits
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: updatedCredits },
      });

      // Record transaction
      await prisma.creditTransaction.create({
        data: {
          userId: user.id,
          type: "DEDUCTION",
          amount: -cost,
          balanceAfter: updatedCredits,
          description: `${brand} ${model} - ${action} (${mode})`,
          reference: "JOB-" + Math.floor(100000 + Math.random() * 900000),
        },
      });
    }

    // Record device operation audit log
    const operation = await prisma.deviceOperation.create({
      data: {
        userId: user.id,
        brand: brand || "Generic",
        model: model || "Unknown Model",
        action: action || "SERVICE_OP",
        chipset: chipset || "Unknown",
        mode: mode || "MTP",
        creditsDeducted: cost,
        status: status || "SUCCESS",
        hwid: hwid || user.hwid,
        ipAddress: "127.0.0.1",
        logDetails: logDetails || "Operation completed.",
      },
    });

    return NextResponse.json({
      success: true,
      message: status === "SUCCESS" ? `Operation recorded. ${cost} credits deducted.` : "Operation ended without credit deduction.",
      newBalance: updatedCredits,
      operationId: operation.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

