import { DetailType } from "@/types/about";
import React from "react";

type Props = {
  item: DetailType;
};

export default function DetailItem({
  item: { title, date, description, role, stack, whatIDid, member },
}: Props) {
  return (
    <div className="mb-10 relative before:absolute before:w-2 before:h-2 before:rounded before:bg-purple-600 before:-left-7 before:top-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-800">Tech Stack: {stack.toString()}</p>
      <span className="text-sm text-gray-600">{date}</span>

      <div className="my-3 text-sm">
        <p>프로젝트 설명: {description}</p>
        <p>프로젝트 역할: {role}</p>
        <p>프로젝트 인원: {member}</p>
      </div>
      <div className="text-sm">
        <h4 className="font-bold">What I did:</h4>
        <ul className="pl-6 list-disc">
          {whatIDid.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
