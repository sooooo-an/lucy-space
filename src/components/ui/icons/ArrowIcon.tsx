import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  isOpen: boolean;
};
export default function ArrowIcon({ isOpen }: Props) {
  return isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />;
}
