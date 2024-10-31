import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  alt: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_CLASS = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-20 h-20",
} as const;

export default function Avatar({ image, alt, size = "md" }: Props) {
  return (
    <div>
      <Image
        src={image}
        alt={alt}
        width={40}
        height={40}
        className={`${SIZE_CLASS[size]} rounded-lg`}
      />
    </div>
  );
}
