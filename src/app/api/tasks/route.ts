import { Task } from "@/types/task";
import { ResponseError } from "@/utils/ResponseError";
import { NextRequest } from "next/server";

export async function GET() {}

export async function POST(req: NextRequest) {
  try {
    const body: Task = await req.json();

    if (!body) {
      throw new ResponseError({ status: 400, message: "Bad Request" });
    }

    if (!body.title || !body.boardId || !body.assigneeId) {
      throw new ResponseError({
        status: 400,
        message: "Title, boardId, and assigneeId are required",
      });
    }

    // const task = await createTask(body);
  } catch (error) {}
}

export async function DELETE() {}
