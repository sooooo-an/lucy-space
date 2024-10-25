import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProjectContent({ children }: Props) {
  return (
    <>
      <h2>Subtask</h2>
      <p>프로젝트 소개 어쩌고저쩌고</p>
      <div>
        <button>프로젝트 회고</button>
      </div>
      <section>{children}</section>
    </>
  );
}
