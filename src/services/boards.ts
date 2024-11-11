import prisma from "@/lib/prisma";
import { KanbanData } from "@/types/task";
import { ResponseError } from "@/utils/ResponseError";

export const getBoards = async () => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        tasks: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const filteredBoards: KanbanData[] = boards.map(
      ({ id, title, status, tasks }) => ({
        id,
        title,
        status,
        tasks: tasks.map((task) => task.id),
      })
    );

    return filteredBoards;
  } catch (error) {
    console.error("[PRISMA ERROR] get boards DB:", error);
    if (error instanceof ResponseError) {
      throw error;
    }

    throw new ResponseError({ status: 500, message: JSON.stringify(error) });
  }
};
