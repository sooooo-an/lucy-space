import { IconButtonType } from "@/types/ui";
import Link from "next/link";
import React from "react";

type Props = IconButtonType;

const STYLE = `flex items-center justify-center gap-2`;
const BUTTON_STYLE =
  "bg-gray-300 rounded-full w-6 h-6 text-gray-800 text-lg flex items-center justify-center";

export default function IconButton(props: Props) {
  const { type, icon, text = "" } = props;

  switch (type) {
    case "button":
      return (
        <button className={STYLE} onClick={props.onClick}>
          <span className={BUTTON_STYLE}>{icon}</span>
          <span className="md:hidden text-text-primary">{text}</span>
        </button>
      );
    case "link":
      return (
        <Link
          className={STYLE}
          href={props.link}
          target={props.isBlank ? "_blank" : "_self"}
        >
          <span className={BUTTON_STYLE}>{icon}</span>
          <span className="md:hidden text-text-primary">{text}</span>
        </Link>
      );
    default:
      return null;
  }
}
