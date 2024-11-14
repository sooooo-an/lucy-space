import React from "react";
import useMessage from "@/hooks/useMessage";
import useAutoScrollToBottom from "@/hooks/useAutoScrollToBottom";
import RefreshIcon from "../ui/icons/RefreshIcon";
import Tooltip from "../ui/Tooltip";

export default function MessageView() {
  const { isLoading, messages, refetch } = useMessage();
  const bottomRef = useAutoScrollToBottom<HTMLDivElement>([messages]);

  if (isLoading) return <span>로딩중...</span>;

  if (messages && messages?.length === 0) return <span>메시지가 없습니다</span>;

  return (
    <section className="relative">
      <ul>
        {messages?.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
        <div ref={bottomRef} />
      </ul>
      <div ref={bottomRef} />

      <div className="absolute right-2 top-2">
        <Tooltip
          position="bottom"
          tooltipText="기존 프로젝트에서는 Open API를 이용하여 메시지를 생성하면, 소켓을 통해 새메시지가 들어왔습니다. 그러나 이 프로젝트는 어떻게 실행하는 지 보여주는 용도이기 때문에 소켓을 추가하지 않았습니다."
        >
          <button
            className="bg-yellow-500 p-1 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => refetch()}
          >
            <RefreshIcon />
          </button>
        </Tooltip>
      </div>
    </section>
  );
}
