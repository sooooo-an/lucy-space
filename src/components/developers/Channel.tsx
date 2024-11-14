import React from "react";

import MessageView from "../common/MessageView";
import ChannelInputBox from "./ChannelInputBox";

export default function Channel() {
  return (
    <section className="w-full h-48 bg-white flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <MessageView />
      </div>
      <ChannelInputBox />
    </section>
  );
}
