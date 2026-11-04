import { prisma } from "@phoenix/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, hwid, brand, model, action } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.hwid && hwid && user.hwid !== hwid) {
      return NextResponse.json(
        { success: false, message: "HWID mismatch detected" },
        { status: 403 }
      );
    }

    // Determine credit cost based on model or action
    let requiredCredits = 5;
    const modelRecord = await prisma.supportedDevice.findFirst({
      where: {
        OR: [
          { modelName: { contains: model || "" } },
          { modelCode: { contains: model || "" } },
        ],
      },
    });

    if (modelRecord) {
      requiredCredits = modelRecord.creditCost;
    } else if (action?.includes("EDL") || action?.includes("MI_ACCOUNT")) {
      requiredCredits = 10;
    } else if (action?.includes("FLASH")) {
      requiredCredits = 8;
    }

    if (user.credits < requiredCredits) {
      return NextResponse.json(
        {
          success: false,
          message: `Insufficient server credits! Required: ${requiredCredits} Credits. Current Balance: ${user.credits} Credits. Please recharge via official reseller.`,
          requiredCredits,
          currentCredits: user.credits,
        },
        { status: 402 }
      );
    }

    // Generate single-use authorization token
    const authToken = "auth_tok_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now();

    return NextResponse.json({
      success: true,
      message: `Operation authorized. ${requiredCredits} credits will be consumed upon completion.`,
      requiredCredits,
      currentCredits: user.credits,
      authToken,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

