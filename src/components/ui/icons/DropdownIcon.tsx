import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type Props = {
  isOpen: boolean;
};

export default function DropdownIcon({ isOpen }: Props) {
  return isOpen ? (
    <IoMdArrowDropup size={20} />
  ) : (
    <IoMdArrowDropdown size={20} />
  );
}
