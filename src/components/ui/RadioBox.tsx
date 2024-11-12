import { InputData } from "@/types/auth";
import React from "react";

type Props = {
  item: InputData;
  checked: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioBox({
  item: { id, type, name, label },
  checked,
  onChange,
}: Props) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        className="mr-1"
        checked={checked === id}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
