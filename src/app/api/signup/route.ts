import { createUser } from "@/services/users";
import { ResponseError } from "@/utils/ResponseError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      throw new ResponseError({ status: 400, message: "Bad Request" });
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
    if (error instanceof ResponseError) {
      return NextResponse.json(error);
    }

    return NextResponse.json(
      new ResponseError({ status: 500, message: "Internal Server Error" })
    );
  }
}
