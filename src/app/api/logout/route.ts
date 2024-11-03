import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.append(
      "Set-Cookie",
      serialize("authToken", "", {
        expires: new Date(0),
        path: "/",
      })
    );
    response.headers.append(
      "Set-Cookie",
      serialize("uuid", "", {
        expires: new Date(0),
        path: "/",
      })
    );
    return response;
  } catch (error) {
    console.error("[API ERROR] /logout:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
