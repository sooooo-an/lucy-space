import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProjectContent({ children }: Props) {
  return <div>{children}</div>;
}
