'use client'

import React, { useState } from 'react'
import { CategoryData } from '@/types/post'
import CategoryItem from './CategoryItem'
import FoldIcon from './icons/FoldIcon'

type Props = {
  categories: CategoryData
}

export default function MobileCategories({ categories }: Props) {
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

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={clickBackdrop}
      onKeyDown={pressEscapeKey}
      className={`z-3 fixed h-full w-full ${BACKDROP_STYLE} ${isFolded ? '-left-[250px] before:hidden' : 'left-0 before:block'} transition-all`}
    >
      <ul className="z-4 relative h-full w-[250px] border-r border-r-border bg-background p-4">
        {Object.keys(categories).map((category) => (
          <CategoryItem categories={categories} category={category} key={category} />
        ))}
      </ul>
      <button
        className="absolute left-[250px] top-1/2 flex h-20 w-6 -translate-y-1/2 items-center justify-center rounded-br-2xl rounded-tr-2xl bg-text-secondary/90 text-white outline-none"
        onClick={toggleFold}
      >
        <FoldIcon isFolded={isFolded} />
      </button>
    </div>
  )
}

const BACKDROP_STYLE =
  'before:fixed before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-black/70'
