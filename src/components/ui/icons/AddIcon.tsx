import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

type Props = {
  type: "fill" | "outline";
};

export default function AddIcon({ type = "fill" }: Props) {
  if (type === "fill") {
    return <FaPlusCircle />;
  }
  return <IoMdAdd />;
}
