import ProjectOverview from "@/components/projects/ProjectOverview";
import React from "react";

export default function NotificationPage() {
  return (
    <>
      <ProjectOverview
        title="Notification Project"
        description="사용자에게 알림을 전달하고, 동일 알림을 스레드로 그룹핑하여 관리 효율성을 개선하였습니다"
      />
    </>
  );
}
