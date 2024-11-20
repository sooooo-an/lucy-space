import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
} & (LinkType | ButtonType);

const STYLE = `w-12 h-12 flex items-center justify-center text-3xl rounded-lg shadow-md border border-gray-050`;

export default function IconButton(props: Props) {
  const { type, icon, iconColor, bgColor } = props;

  switch (type) {
    case "button":
      return (
        <button className={STYLE} onClick={props.onClick}>
          {icon}
        </button>
      );
    case "link":
      return (
        <Link
          style={{ backgroundColor: bgColor, color: iconColor }}
          className={STYLE}
          href={props.link}
          target={props.isBlank ? "_blank" : "_self"}
        >
          {icon}
        </Link>
      );
    default:
      return null;
  }
}

type LinkType = {
  type: "link";
  link: string;
  isBlank?: boolean;
};

type ButtonType = {
  type: "button";
  onClick: () => void;
};
