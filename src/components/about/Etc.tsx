import React from "react";
import Panel from "../ui/Panel";

type Props = {
  list: string[];
};

export default function Etc({ list }: Props) {
  return (
    <Panel title="ETC.">
      <ul className="list-disc pl-6">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Panel>
  );
}
