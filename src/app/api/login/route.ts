import { getUser } from "@/services/users";
import { ResponseError } from "@/utils/ResponseError";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      throw new ResponseError({ status: 400, message: "Bad Request" });
    }

    const user = await getUser(body);

    const token = jwt.sign(
      { userId: user.id, name: user.name, thumbnail: user.thumbnail },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        thumbnail: user.thumbnail,
      },
    });
    response.headers.append(
      "Set-Cookie",
      serialize("authToken", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "strict",
      })
    );
    response.headers.append(
      "Set-Cookie",
      serialize("uuid", user.id, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "strict",
      })
    );

    return response;
  } catch (error) {
    console.error("[API ERROR] /login:", error);
    if (error instanceof ResponseError) {
      return NextResponse.json(error);
    }

    return NextResponse.json(
      new ResponseError({ status: 500, message: "Internal Server Error" })
    );
  }
}
