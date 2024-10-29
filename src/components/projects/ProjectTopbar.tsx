import React from "react";
import { AlertIcon, ThemeIcon } from "../ui/icons";

const BUTTON_CLASS =
  "flex items-center justify-center text-gray-400 text-xl hover:text-gray-900 hover:bg-gray-200 w-8 h-8 rounded-lg";

export default function ProjectTopbar() {
  return (
    <section className="h-[68px] border-b bg-white flex justify-end px-4 gap-x-4 items-center">
      <button className={BUTTON_CLASS}>
        <AlertIcon isNew={false} />
      </button>
      <button className={BUTTON_CLASS}>
        <ThemeIcon isDarkmode={false} />
      </button>
    </section>
  );
}
