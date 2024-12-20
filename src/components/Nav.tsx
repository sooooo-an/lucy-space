'use client'

import React, { useState } from 'react'
import NavMenu from './NavMenu'
import MobileNavButton from './MobileNavButton'
import GithubButton from './GithubButton'
import ThemeButton from './ThemeButton'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => setIsOpen(!isOpen)

  return (
    <>
      <nav
        className={`flex-1 items-center justify-between ${
          isOpen ? 'block' : 'hidden'
        } ${MOBILE_NAV_STYLE} ${WEB_NAV_STYLE}`}
      >
        <NavMenu />
        <div className="block items-center gap-4 md:flex">
          <GithubButton />
          <ThemeProvider>
            <ThemeButton />
          </ThemeProvider>
        </div>
      </nav>
      <MobileNavButton onToggle={onToggle} isOpen={isOpen} />
    </>
  )
}

const WEB_NAV_STYLE =
  'md:flex md:block md:bg-transparent md:static md:shadow-none md:rounded-none md:px-0 md:border-0'
const MOBILE_NAV_STYLE =
  'absolute top-12 right-3 bg-background shadow-md rounded-md px-2 border border-border'
