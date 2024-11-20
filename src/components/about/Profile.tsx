import React from "react";
import Avatar from "@/components/ui/Avatar";

type Props = {
  image: string;
};

export default function Profile({ image }: Props) {
  return (
    <h1 className="mb-2">
      <Avatar type="circle" size="lg" image={image} alt="character" />
    </h1>
  );
}
