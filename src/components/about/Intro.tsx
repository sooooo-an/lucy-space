import React from "react";
import Panel from "../ui/Panel";

type Props = {
  paragraph: string[];
};

export default function Intro({ paragraph }: Props) {
  return (
    <Panel title="INTRO.">
      {paragraph.map((p, index) => (
        <p
          key={index}
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: p }}
        />
      ))}
    </Panel>
  );
}
