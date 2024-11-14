import { sendMessage } from "@/services/message";
import { ResponseError } from "@/utils/ResponseError";
import { NextRequest, NextResponse } from "next/server";

const MENUS = [
  {
    type: "plain_text",
    text: "김치찌개",
    id: "kimchi",
  },
  {
    type: "plain_text",
    text: "피자",
    id: "pizza",
  },
  {
    type: "plain_text",
    text: "초밥",
    id: "sushi",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { actionId } = await req.json();

    if (actionId === "submit_vote") {
      const menus = MENUS.map((menu) => menu.text);
      const random = Math.floor(Math.random() * menus.length);
      await sendMessage(`오늘의 메뉴는 ${menus[random]}입니다.`);
      return NextResponse.json({
        data: `오늘의 메뉴는 ${menus[random]}입니다.`,
      });
    }
  } catch (error) {
    if (error instanceof ResponseError) {
      throw error;
    }
  }
}
