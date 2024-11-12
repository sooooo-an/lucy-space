"use client";

import React from "react";
import CreateApp from "./CreateApp";
import CreateAppAction from "./CreateAppAction";
import CreateBuilder from "./CreateBuilder";
import ExecuteAppAction from "./ExecuteAppAction";
import { useAppAction } from "@/contexts/AppActionContext";
import { APP_ACTION_PROCESS } from "@/constants/app-action";
import { AppInfoType } from "@/types/app";
import useBuilder from "@/hooks/useBuilder";

type Props = {
  appInfo: AppInfoType;
  callbackUrl: string;
};

export default function DeveloperContent({ appInfo, callbackUrl }: Props) {
  const { process, appActionType } = useAppAction();
  const builder = useBuilder(
    process === APP_ACTION_PROCESS.SET_CALLBACK_URL,
    appActionType
  );
  console.log(builder);

  return (
    <article className="pt-5 pl-5">
      <CreateApp
        isOpen={process === APP_ACTION_PROCESS.CREATE_APP}
        appInfo={appInfo}
      />
      <CreateAppAction
        isOpen={process === APP_ACTION_PROCESS.SET_APP_ACTION_TYPE}
      />
      <CreateBuilder
        isOpen={process === APP_ACTION_PROCESS.SET_CALLBACK_URL}
        callbackUrl={callbackUrl}
        builder={builder}
      />
      <ExecuteAppAction
        isOpen={process === APP_ACTION_PROCESS.EXECUTE_APP_ACTION}
        builder={builder}
      />
    </article>
  );
}
