import { InputData } from "@/types/auth";

export const APP_ACTION: InputData[] = [
  {
    label: "채널 레이어",
    type: "radio",
    name: "appAction",
    id: "channelLayer",
  },
  {
    label: "테스크 모달",
    type: "radio",
    name: "appAction",
    id: "taskModal",
  },
  {
    label: "오른쪽 패널",
    type: "radio",
    name: "appAction",
    id: "rightPanel",
  },
];

export const APP_ACTION_PROCESS = {
  CREATE_APP: "createApp",
  SET_APP_ACTION_TYPE: "setAppActionType",
  SET_CALLBACK_URL: "setCallbackUrl",
  EXECUTE_APP_ACTION: "executeAppAction",
} as const;

export const APP_ACTION_TYPE = {
  CHANNEL_LAYER: "channelLayer",
  TASK_MODAL: "taskModal",
  RIGHT_PANEL: "rightPanel",
} as const;
