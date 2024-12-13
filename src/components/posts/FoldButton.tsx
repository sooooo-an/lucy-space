import React from "react";
import FoldIcon from "../ui/icons/FoldIcon";

type Props = {
  onToggle: () => void;
  isFolded: boolean;
};

export default function FoldButton({ onToggle, isFolded }: Props) {
  return (
    <button
      className="absolute -right-6 bg-text-secondary/90 h-20 w-6 rounded-tr-2xl rounded-br-2xl top-1/2 -translate-y-1/2  flex items-center justify-center text-white lg:hidden"
      onClick={onToggle}
    >
      <FoldIcon isFolded={isFolded} />
    </button>
  );
}
