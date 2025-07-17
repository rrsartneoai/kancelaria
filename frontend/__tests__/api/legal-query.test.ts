import { POST } from "@/app/api/legal-query/route";
import { NextRequest } from "next/server";
import jest from "jest";

// Mock the Gemini API
jest.mock("@/lib/gemini", () => ({
  generateLegalResponse: jest.fn().mockResolvedValue({
    answer: "Mocked legal response",
    confidence: 0.85,
    disclaimer: "This is a test disclaimer",
    sources: ["Test source"],
  }),
}));

describe("/api/legal-query", () => {
  it("handles valid legal query", async () => {
    const request = new NextRequest("http://localhost:3000/api/legal-query", {
      method: "POST",
      body: JSON.stringify({
        question: "What is contract law?",
        language: "en",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.answer).toBe("Mocked legal response");
    expect(data.confidence).toBe(0.85);
  });

  it("returns error for missing question", async () => {
    const request = new NextRequest("http://localhost:3000/api/legal-query", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Question is required");
  });
});
