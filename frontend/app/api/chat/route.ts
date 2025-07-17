import { streamLegalResponse } from "@/lib/gemini";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, locale = "pl" } = await req.json();

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage?.content) {
      return new Response("No message content provided", { status: 400 });
    }

    const result = streamLegalResponse({
      question: lastMessage.content,
      language: locale,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
