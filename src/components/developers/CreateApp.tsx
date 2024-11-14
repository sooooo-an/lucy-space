import React from "react";
import Panel from "../ui/Panel";
import Image from "next/image";
import Button from "../ui/Button";
import { useAppAction } from "@/contexts/AppActionContext";
import { APP_ACTION_PROCESS } from "@/constants/app-action";
import { AppInfoType } from "@/types/app";

type Props = {
  isOpen: boolean;
  appInfo: AppInfoType;
};

export default function CreateApp({ isOpen, appInfo }: Props) {
  const { updateProcess } = useAppAction();
  const { appDescription, appIcon, appName } = appInfo;

  const createApp = () => {
    updateProcess(APP_ACTION_PROCESS.SET_APP_ACTION_TYPE);
  };

  return (
    <Panel isOpen={isOpen} title="1. App을 생성하고, 관리자 승인을 받습니다.">
      <>
        <section className="flex">
          <div className="mr-3">
            <Image
              src={appIcon}
              width={100}
              height={100}
              alt={appName}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="name"
              className="text-sm text-gray-700 font-bold mb-1"
            >
              App 이름
            </label>
            <input
              id="name"
              className="rounded-md p-1 outline-none text-sm mb-2"
              value={appName}
              readOnly
            />
            <label
              htmlFor="description"
              className="text-sm text-gray-700 font-bold mb-1"
            >
              App 설명
            </label>
            <textarea
              className="rounded-md p-1 outline-none text-sm mb-2 resize-none"
              readOnly
              id="description"
              defaultValue={appDescription}
            ></textarea>
          </div>
        </section>

        <div className="mt-5">
          <Button
            text="App 생성"
            color="primary"
            type="button"
            onClick={createApp}
          />
        </div>
      </>
    </Panel>
  );
}
