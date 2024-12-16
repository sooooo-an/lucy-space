'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_MENU } from '@data/navLink'

export default function NavMenu() {
  const pathname = usePathname()

  return (
    <ul className={`relative gap-4 py-2 text-center md:py-0 md:pl-3 ${LEFT_LINE_STYLE}`}>
      {NAV_MENU.map(({ href, name }) => (
        <li key={href}>
          <Link
            href={href}
            className={`${pathname.startsWith(href) && 'font-semibold text-primary'}`}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const LEFT_LINE_STYLE =
  'before:absolute before:w-[1px] before:h-4 before:bg-gray-500 before:left-0 before:top-1 before:hidden md:before:block'
