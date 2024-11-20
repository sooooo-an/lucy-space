import React from "react";
import Image from "next/image";
import Panel from "../ui/Panel";

type Props = {
  skills: string[];
};

export default function Skills({ skills }: Props) {
  return (
    <Panel title="SKILL.">
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill) => (
          <Image
            key={skill}
            src={`/images/skills/${skill}.png`}
            alt={skill}
            width={60}
            height={60}
            className="w-9 h-9 rounded-lg object-contain shadow-sm p-1 border border-gray-100"
          />
        ))}
      </div>
    </Panel>
  );
}
