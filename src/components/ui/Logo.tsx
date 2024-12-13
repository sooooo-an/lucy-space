import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="mr-3 flex items-center gap-1 text-lg font-bold uppercase text-text-primary">
        <Image src="/images/logo.png" alt="Lucy.Space" width={30} height={30} />
        Lucy.Space.
      </h1>
    </Link>
  )
}
