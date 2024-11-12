import React from "react";
import ArrowIcon from "../ui/icons/ArrowIcon";

type Props = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  toggleOpen?: () => void;
};

export default function AppPanel({
  children,
  title,
  isOpen,
  toggleOpen,
}: Props) {
  return (
    <section className="w-[500px]">
      <div className="bg-white p-5 flex justify-between rounded-tr-md rounded-tl-md shadow-sm">
        <h4 className="font-bold">{title}</h4>
        <button onClick={toggleOpen}>
          <ArrowIcon isOpen={isOpen} />
        </button>
      </div>

      {isOpen && <div className=" bg-slate-100 p-5">{children}</div>}
    </section>
  );
}
