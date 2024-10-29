import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  alt: string;
};

export default function Avatar({ image, alt }: Props) {
  return (
    <div className="bg-gray-300 w-10 h-10 rounded-lg">
      <Image src={image} alt={alt} width={40} height={40} />
    </div>
  );
}
