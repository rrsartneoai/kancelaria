import { generateLegalResponse } from "@/lib/gemini";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, language = "pl" } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 },
      );
    }

    const response = await generateLegalResponse({
      question,
      language,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Legal query error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
