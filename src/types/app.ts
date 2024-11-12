import { APP_ACTION_PROCESS, APP_ACTION_TYPE } from "../constants/app-action";

export type AppActionProcess =
  (typeof APP_ACTION_PROCESS)[keyof typeof APP_ACTION_PROCESS];

export type AppActionType =
  (typeof APP_ACTION_TYPE)[keyof typeof APP_ACTION_TYPE];

export type AppInfoType = {
  appName: string;
  appDescription: string;
  appId: string;
  appIcon: string;
};

export type AppInfoResponseType = {
  appInfo: AppInfoType;
  callbackUrl: string;
};
