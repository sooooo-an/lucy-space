import React, { useState } from "react";
import AppPanel from "./AppPanel";
import {
  APP_ACTION,
  APP_ACTION_PROCESS,
  APP_ACTION_TYPE,
} from "@/constants/app-action";
import Button from "../ui/Button";
import { useAppAction } from "@/contexts/AppActionContext";
import { AppActionType } from "@/types/app";
import RadioBox from "../ui/RadioBox";

type Props = {
  isOpen: boolean;
};

export default function CreateAppAction({ isOpen }: Props) {
  const { updateProcess } = useAppAction();
  const [checked, setChecked] = useState<AppActionType>(
    APP_ACTION_TYPE.CHANNEL_LAYER
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setChecked(id as AppActionType);
  };

  const setAppAction = () => {
    updateProcess(APP_ACTION_PROCESS.SET_CALLBACK_URL, checked);
  };

  return (
    <AppPanel isOpen={isOpen} title="2. App Action을 생성합니다.">
      <div>
        <p className="text-sm text-gray-700 font-bold mb-2">App 액션 종류</p>

        <div className="flex gap-3 mb-6">
          {APP_ACTION.map((action) => (
            <RadioBox
              key={action.id}
              item={action}
              checked={checked}
              onChange={onChange}
            />
          ))}
        </div>
      </div>

      <Button
        text="App Action 생성"
        color="primary"
        type="button"
        onClick={setAppAction}
      />
    </AppPanel>
  );
}
