import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set(
    "Set-Cookie",
    serialize("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })
  );
  return response;
}
