import { InputData } from "@/types/auth";
import React from "react";

type Props = {
  item: InputData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthInputBox({
  item: { id, name, type, placeholder, label },
  value,
  onChange,
}: Props) {
  return (
    <div
      key={id}
      className="flex border w-full h-10 items-center p-2 rounded-md border-gray-400 gap-2 text-sm mb-2"
    >
      <label className="basis-1/4" htmlFor={id}>
        {label}
      </label>
      <input
        className="flex-1 outline-none"
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
