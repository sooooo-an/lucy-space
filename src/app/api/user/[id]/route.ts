import { getUserById } from "@/services/users";
import { type ResponseError } from "@/utils/ResponseError";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  try {
    const { id } = context.params;

    const user = await getUserById(id);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        thumbnail: user.thumbnail,
      },
    });
  } catch (error) {
    console.error("[API ERROR] /user/[id]:", error);
    const responseError = error as ResponseError;
    return NextResponse.json(responseError);
  }
}
