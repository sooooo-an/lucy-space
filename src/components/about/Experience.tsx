import React from "react";
import Panel from "../ui/Panel";
import { ExperienceType } from "@/types/about";
import HistoryBox from "./HistoryBox";
import Chronology from "../ui/Chronology";

type Props = {
  list: ExperienceType[];
};

export default function Experience({ list }: Props) {
  return (
    <Panel title="EXPERIENCE.">
      <Chronology>
        {list.map((item, index) => (
          <HistoryBox key={index} {...item} />
        ))}
      </Chronology>
    </Panel>
  );
}
