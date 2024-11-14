import React from "react";
import Avatar from "./Avatar";

type Props = {
  onClick: (id: string) => void;
  name: string;
  id: string;
  icon: string;
  desc: string;
};

export default function AppLayer({ name, id, icon, desc, onClick }: Props) {
  return (
    <ul className="absolute w-2/3 text-xs -top-14 shadow-sm bg-slate-50">
      <li className="p-2">
        <button className="flex w-full" onClick={() => onClick(id)}>
          <div className="shrink-0 pr-2">
            <Avatar image={icon} alt={name} />
          </div>

          <div className="truncate flex flex-col justify-center ">
            <p className="font-bold text-sm text-left">{name}</p>
            <span className="truncate">{desc}</span>
          </div>
        </button>
      </li>
    </ul>
  );
}
