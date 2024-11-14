import React from "react";
import Panel from "../ui/Panel";
import { useAppAction } from "@/contexts/AppActionContext";
import Channel from "./Channel";
import { APP_ACTION_TYPE } from "@/constants/app-action";
import { BuilderModalProvider } from "@/contexts/BuilderModalContext";

type Props = {
  isOpen: boolean;
};

export default function ExecuteAppAction({ isOpen }: Props) {
  const { appActionType } = useAppAction();
  return (
    <BuilderModalProvider>
      <Panel isOpen={isOpen} title="4. App Action을 사용합니다.">
        {appActionType === APP_ACTION_TYPE.CHANNEL_LAYER && <Channel />}
      </Panel>
    </BuilderModalProvider>
  );
}
