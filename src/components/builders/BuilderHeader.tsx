import { BuilderType } from "@/types/builder";
import React from "react";

type Props = {
  header: BuilderType["header"];
};

export default function BuilderHeader({ header: { title } }: Props) {
  return (
    <header>
      <h1 className="text-lg text-center font-bold">{title}</h1>
    </header>
  );
}
