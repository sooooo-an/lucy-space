import KanbanBoard from "@/components/subtask/KanbanBoard";
import ProjectOverview from "@/components/projects/ProjectOverview";
import React from "react";
import { getBoards } from "@/services/boards";

export default async function SubtaskPage() {
  const boards = await getBoards();
  return (
    <>
      <ProjectOverview
        title="Subtask Project"
        description="기존 테스크에 하위 테스크 목록을 관리하는 기능을 개발하여 UI/UX를 개선하였습니다"
      />
      <KanbanBoard boards={boards} />
    </>
  );
}
