import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="font-bold text-2xl">Lucy.Space.</h1>
    </Link>
  );
}
