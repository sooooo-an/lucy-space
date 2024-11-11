import React from "react";
import Avatar from "./Avatar";
import { UserData } from "@/types/user";

type Props = {
  user: UserData;
  logout: () => void;
};

export default function UserProfile({ user, logout }: Props) {
  const { photoURL, displayName } = user;
  return (
    <section className="flex gap-x-2 items-center shadow-sm px-2 h-[60px] rounded-lg border border-gray-100 shadow-gray-200">
      {photoURL ? (
        <Avatar image={photoURL} alt={displayName ?? ""} />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-gray-300"></div>
      )}

      <div className="basis-3/5 flex flex-col justify-center">
        <p className="text-sm font-bold">{displayName}</p>
        <button
          onClick={logout}
          className="text-xs text-gray-500 flex hover:underline"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
