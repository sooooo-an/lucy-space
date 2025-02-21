'use client'

import { CategoryData } from '@/types/post'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type Props = {
  categories: CategoryData
  category: string
}

export default function CategoryItem({ category, categories }: Props) {
  const pathname = usePathname()
  return (
    <li key={category} className="mb-7 font-semibold text-text-primary">
      <p className="flex items-center gap-1 pb-2">
        {category}
        <span>({categories[category].length})</span>
      </p>
      <ul>
        {categories[category].map(({ path, title }) => (
          <li key={path} className="pb-1 text-sm">
            <Link
              href={`/posts/${path}`}
              className={`block truncate transition-all hover:text-primary ${
                pathname === `/posts/${path}`
                  ? 'font-bold text-primary'
                  : 'font-normal text-text-primary'
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}
