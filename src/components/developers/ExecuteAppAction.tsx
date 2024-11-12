import React from "react";
import AppPanel from "./AppPanel";
import { useAppAction } from "@/contexts/AppActionContext";
import ChannelLayer from "./ChannelLayer";
import { APP_ACTION_TYPE } from "@/constants/app-action";
import TaskModal from "./TaskModal";
import RightPanel from "./RightPanel";
import { BuilderType } from "@/types/builder";

type Props = {
  isOpen: boolean;
  builder: BuilderType | null;
};

export default function ExecuteAppAction({ isOpen, builder }: Props) {
  const { appActionType } = useAppAction();
  return (
    <AppPanel isOpen={isOpen} title="4. App Action을 사용합니다.">
      {appActionType === APP_ACTION_TYPE.CHANNEL_LAYER && <ChannelLayer />}
      {appActionType === APP_ACTION_TYPE.RIGHT_PANEL && <RightPanel />}
      {appActionType === APP_ACTION_TYPE.TASK_MODAL && <TaskModal />}
    </AppPanel>
  );
}
