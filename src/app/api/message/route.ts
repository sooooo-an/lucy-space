import { getAllMessage, sendMessage } from "@/services/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const message = await getAllMessage();

  return NextResponse.json({
    message,
  });
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const newMessage = await sendMessage(message);

  return NextResponse.json({
    message: newMessage,
  });
}
