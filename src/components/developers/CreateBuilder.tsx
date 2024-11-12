import React from "react";
import AppPanel from "./AppPanel";
import Button from "../ui/Button";
import { useAppAction } from "@/contexts/AppActionContext";
import { APP_ACTION_PROCESS } from "@/constants/app-action";
import { BuilderType } from "@/types/builder";
type Props = {
  isOpen: boolean;
  callbackUrl: string;
  builder: BuilderType | null;
};

export default function CreateBuilder({ isOpen, callbackUrl, builder }: Props) {
  const { updateProcess } = useAppAction();

  const setCallbackUrl = () => {
    updateProcess(APP_ACTION_PROCESS.EXECUTE_APP_ACTION);
  };

  return (
    <AppPanel
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
              defaultValue={JSON.stringify(builder, null, 2)}
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
    </AppPanel>
  );
}
