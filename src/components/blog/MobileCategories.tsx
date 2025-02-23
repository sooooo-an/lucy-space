'use client'

import React, { useEffect, useState } from 'react'
import { CategoryData } from '@/types/post'
import CategoryItem from './CategoryItem'
import FoldIcon from '../icons/FoldIcon'
import { usePathname } from 'next/navigation'

type Props = {
  categories: CategoryData
}

export default function MobileCategories({ categories }: Props) {
  const pathname = usePathname()
  const [isFolded, setIsOpen] = useState(true)

  const toggleFold = () => setIsOpen(!isFolded)

  const clickBackdrop = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsOpen(true)
    }
  }

  const pressEscapeKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    setIsOpen(true)
  }, [pathname])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={clickBackdrop}
      onKeyDown={pressEscapeKey}
      className={`fixed top-0 z-10 ${BACKDROP_STYLE} ${isFolded ? '-left-[280px] before:hidden' : 'left-0 before:block'} transition-all`}
    >
      <ul className="z-4 relative h-dvh w-[280px] border-r border-r-border bg-background p-4">
        {Object.keys(categories).map((category) => (
          <CategoryItem categories={categories} category={category} key={category} />
        ))}
      </ul>
      <button
        className="absolute left-[280px] top-1/2 flex h-20 w-6 -translate-y-1/2 items-center justify-center rounded-br-2xl rounded-tr-2xl bg-text-secondary/90 text-white outline-none"
        onClick={toggleFold}
      >
        <FoldIcon isFolded={isFolded} />
      </button>
    </div>
  )
}

const BACKDROP_STYLE =
  'before:fixed before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-black/70'
