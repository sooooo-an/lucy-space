import { createUser } from "@/services/users";
import { type ResponseError } from "@/utils/ResponseError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      throw { status: 400, message: "Bad Request" } as ResponseError;
    }

    const user = await createUser(body);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        thumbnail: user.thumbnail,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.error("[API ERROR] /signup:", error);
    const responseError = error as ResponseError;
    return NextResponse.json(responseError);
  }
}
