import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-bold text-2xl flex items-center gap-1">
        <Image src="/images/logo.png" alt="Lucy.Space" width={40} height={40} />
        Lucy.Space.
      </h1>
    </Link>
  );
}
