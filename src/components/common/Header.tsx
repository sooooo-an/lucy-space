import React from 'react'
import Logo from '../ui/Logo'
import Nav from '../ui/Nav'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-center border-b border-b-border bg-background">
      <div className="container relative flex items-center px-2 py-4">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}
