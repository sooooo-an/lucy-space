import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-bold text-lg uppercase flex items-center gap-1 text-text-primary mr-3">
        <Image src="/images/logo.png" alt="Lucy.Space" width={30} height={30} />
        Lucy.Space.
      </h1>
    </Link>
  );
}
