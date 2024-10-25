import React from "react";
import { RiNotification3Fill } from "react-icons/ri";

type Props = {
  isNew?: boolean;
};

export default function AlertIcon({ isNew = false }: Props) {
  return isNew ? (
    <span className="relative">
      <RiNotification3Fill />
      <span className="bg-red-600 w-2 h-2 absolute rounded-full top-0 right-0 border border-white"></span>
    </span>
  ) : (
    <RiNotification3Fill />
  );
}
