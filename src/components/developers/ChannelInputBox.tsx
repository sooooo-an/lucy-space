import React from "react";
import AddIcon from "../ui/icons/AddIcon";
import AppLayer from "../ui/AppLayer";
import { useAppAction } from "@/contexts/AppActionContext";
import useModalState from "@/hooks/useModalState";
import { APP_ACTION_TYPE } from "@/constants/app-action";
import { useBuilderModal } from "@/contexts/BuilderModalContext";

export default function ChannelInputBox() {
  const {
    appInfo: { appDescription, appIcon, appId, appName },
  } = useAppAction();
  const { executeApp } = useBuilderModal();

  const { open, onClose, onOpen } = useModalState();
  const onClick = () => {
    return open ? onClose() : onOpen();
  };

  const executeAppAction = async (appId: string) => {
    executeApp(appId, APP_ACTION_TYPE.CHANNEL_LAYER).then(() => {
      onClose();
    });
  };

  return (
    <div className="flex border-t relative">
      <button
        onClick={onClick}
        className="w-10 flex items-center justify-center bg-gray-100 py-2"
      >
        <AddIcon type="outline" />
      </button>
      <input
        type="text"
        placeholder="왼쪽 버튼을 클릭해주세요"
        className="flex-1 outline-none text-sm px-2"
        readOnly
      />
      {open && (
        <AppLayer
          name={appName}
          icon={appIcon}
          desc={appDescription}
          id={appId}
          onClick={executeAppAction}
        />
      )}
    </div>
  );
}
