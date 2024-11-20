import React from "react";
import Panel from "../ui/Panel";
import Chronology from "../ui/Chronology";
import { DetailType } from "@/types/about";
import DetailItem from "./DetailItem";

type Props = {
  list: DetailType[];
};

export default function Detail({ list }: Props) {
  return (
    <Panel title="DETAIL.">
      <Chronology>
        {list.map((item, index) => (
          <DetailItem key={index} item={item} />
        ))}
      </Chronology>
    </Panel>
  );
}
