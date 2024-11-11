import React from "react";

type Props = (ButtonTypeProps | SubmitTypeProps) &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const { text, color, onClick } = props;
  return (
    <button
      className={`h-12 w-full mt-2 mb-1 font-bold rounded-lg   ${
        props.disabled ? DISABLED_CLASS : COLOR_CLASS[color]
      }`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

type ButtonTypeProps = {
  type: "button";
  onClick: () => void;
  text: string;
  color: "primary" | "secondary" | "danger";
};

type SubmitTypeProps = {
  type: "submit";
  onClick?: () => void;
  text: string;
  color: "primary" | "secondary" | "danger";
};

const COLOR_CLASS = {
  primary: "bg-yellow-500 hover:bg-yellow-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-black",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const DISABLED_CLASS =
  "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300";
