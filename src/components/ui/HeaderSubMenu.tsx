import React from "react";
import GithubIcon from "./icons/GithubIcon";
import ThemeButton from "./ThemeButton";
import IconButton from "./IconButton";
import { IconButtonType } from "@/types/ui";

const ICON_BUTTONS: IconButtonType[] = [
  {
    type: "link",
    link: "https://github.com/sooooo-an",
    icon: <GithubIcon />,
    isBlank: true,
    text: "Github 바로가기",
  },
  // {
  //   type: "link",
  //   link: "https://github.com/sooooo-an",
  //   icon: <PDFIcon />,
  //   isBlank: true,
  //   text: "이력서 바로가기",
  // },
];

const STYLE = `border-t border-t-border md:border-t-0 flex p-2 gap-1 md:block md:p-0`;

export default function HeaderSubMenu() {
  return (
    <ul className="md:flex gap-4 items-center block">
      {ICON_BUTTONS.map((button) => (
        <li key={button.text} className={STYLE}>
          <IconButton {...button} />
        </li>
      ))}
      <li className={STYLE}>
        <ThemeButton />
      </li>
    </ul>
  );
}
