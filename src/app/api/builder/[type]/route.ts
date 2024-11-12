import { getAppBuilder } from "@/services/app";
import { AppActionType } from "@/types/app";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    type: AppActionType;
  };
};

export async function GET(_: NextRequest, req: Context) {
  return getAppBuilder().then((builder) => {
    return NextResponse.json({
      builder: builder[req.params.type],
    });
  });
}
