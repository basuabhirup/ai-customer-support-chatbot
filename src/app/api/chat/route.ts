import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are an AI assistant for Headstarter, a platform focused on technical interview preparation. Your role is to provide helpful and accurate information about Headstarter's services, answer questions about technical interviews, and assist with account-related queries. Always be polite, professional, and encouraging. If you're unsure about something, it's okay to say you don't know and suggest the user contact Headstarter's support team for more specific information.`;

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data],
    model: "gpt-4",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
