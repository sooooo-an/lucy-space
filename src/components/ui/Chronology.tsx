import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Chronology({ children }: Props) {
  return (
    <section className="flex gap-4">
      <div className="flex flex-col relative items-center ml-4">
        <div className="w-1 bg-black flex-grow"></div>
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-l-transparent border-r-transparent border-t-black"></div>
      </div>
      <section>{children}</section>
    </section>
  );
}
