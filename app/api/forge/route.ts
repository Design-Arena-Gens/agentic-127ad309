import { NextRequest, NextResponse } from "next/server";
import { ForgeEngine } from "@/lib/forge-engine";

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const engine = new ForgeEngine();
    const result = await engine.forge(userInput);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to forge website" },
      { status: 500 }
    );
  }
}
