import React from "react";
import Avatar from "./Avatar";

export default function UserProfile() {
  return (
    <section className="flex gap-x-2 items-center shadow-sm px-2 h-[60px] rounded-lg border border-gray-100 shadow-gray-200">
      <Avatar />
      <div className="basis-3/5">
        <p className="text-sm font-bold">John Doe</p>
        <span className="text-xs text-gray-500">devsoo0527@gmail.com</span>
      </div>
    </section>
  );
}
