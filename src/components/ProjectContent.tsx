import React from "react";

import ProjectTopbar from "./ProjectTopbar";

type Props = {
  children: React.ReactNode;
};

export default function ProjectContent({ children }: Props) {
  return (
    <>
      <ProjectTopbar />
      {children}
    </>
  );
}
