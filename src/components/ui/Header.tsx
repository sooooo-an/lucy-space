import React from 'react'
import Logo from './Logo'
import Nav from '../common/Nav'

export default function Header() {
  return (
    <header className="z-11 fixed top-0 flex w-full items-center justify-center border-b border-b-border bg-background lg:sticky">
      <div className="container relative flex items-center px-2 py-4">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}
