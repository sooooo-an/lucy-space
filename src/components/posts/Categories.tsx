'use client'

import { CategoryData } from '@/types/post'
import React, { useState } from 'react'

import CategoryItem from './CategoryItem'
import FoldButton from './FoldButton'

type Props = {
  categories: CategoryData
}

const WEB_CATEGORY_STYLE = 'lg:flex-shrink-0 lg:w-1/5 lg:static lg:h-auto lg:bg-transparent lg:mt-0'
const MOBILE_CATEGORY_STYLE =
  'absolute bg-background transition-all top-0 bottom-0 mt-[4.2rem] z-10'

export default function Categories({ categories }: Props) {
  const [isFolded, setIsOpen] = useState(true)

  const toggleFold = () => setIsOpen(!isFolded)
  return (
    <section
      className={`border-r border-r-border ${WEB_CATEGORY_STYLE} ${MOBILE_CATEGORY_STYLE} ${
        isFolded ? '-left-[262px]' : 'left-0'
      }`}
    >
      <ul className="static p-3 lg:sticky lg:top-20">
        {Object.keys(categories).map((category) => (
          <CategoryItem categories={categories} category={category} key={category} />
        ))}
      </ul>

      <FoldButton onToggle={toggleFold} isFolded={isFolded} />
    </section>
  )
}
