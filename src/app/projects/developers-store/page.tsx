import DeveloperContent from "@/components/developers/DeveloperContent";
import ProjectOverview from "@/components/projects/ProjectOverview";
import { AppActionProvider } from "@/contexts/AppActionContext";
import { getAppInfo } from "@/services/app";
import React from "react";

export default async function DevelopersStorePage() {
  const { appInfo, callbackUrl } = await getAppInfo();
  return (
    <>
      <ProjectOverview
        title="Developers & Store Project"
        description="서드파티 앱을 자체 앱에서 사용할 수 있도록 개발하고, 자체 앱스토어에 써드파티 앱을 등록하여 사용자에게 서비스를 제공하였습니다"
      />

      <div className="flex flex-1 min-h-0 overflow-y-auto">
        <AppActionProvider>
          <DeveloperContent appInfo={appInfo} callbackUrl={callbackUrl} />
        </AppActionProvider>
      </div>
    </>
  );
}
