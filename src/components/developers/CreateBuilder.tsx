import React from "react";
import Panel from "../ui/Panel";
import Button from "../ui/Button";
import { useAppAction } from "@/contexts/AppActionContext";
import { APP_ACTION_PROCESS } from "@/constants/app-action";
import useBuilder from "@/hooks/useBuilder";

type Props = {
  isOpen: boolean;
  callbackUrl: string;
};

export default function CreateBuilder({ isOpen, callbackUrl }: Props) {
  const { updateProcess, process, appActionType } = useAppAction();
  const builder = useBuilder(
    process === APP_ACTION_PROCESS.SET_CALLBACK_URL,
    appActionType
  );

  const setCallbackUrl = () => {
    updateProcess(APP_ACTION_PROCESS.EXECUTE_APP_ACTION);
  };

  return (
    <Panel
      isOpen={isOpen}
      title="3. 설정된 API의 응답값을 통해 컴포넌트를 만듭니다."
    >
      <>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="text-sm text-gray-700 font-bold mb-1"
          >
            callback URL
          </label>
          <input
            id="name"
            className="rounded-md p-1 outline-none text-sm mb-2"
            value={callbackUrl}
            readOnly
          />
          <label
            htmlFor="description"
            className="text-sm text-gray-700 font-bold mb-1"
          >
            리턴 값
          </label>
          {builder && (
            <textarea
              className="rounded-md p-1 outline-none text-sm mb-2 resize-none h-52"
              readOnly
              id="description"
              defaultValue={builder && JSON.stringify(builder, null, 2)}
            ></textarea>
          )}

          <Button
            text="callback URL 활성화"
            color="primary"
            type="button"
            onClick={setCallbackUrl}
          />
        </div>
      </>
    </Panel>
  );
}
