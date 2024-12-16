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
    <li key={category} className="mb-4 text-sm font-semibold text-text-primary">
      <p className="pb-1">{category}</p>
      <ul>
        {categories[category].map(({ path, title }) => (
          <li key={path} className="pb-1">
            <Link
              href={`/posts/${path}`}
              className={`block truncate text-sm font-normal text-text-secondary hover:text-text-primary ${
                pathname === `/posts/${path}` ? 'font-semibold' : ''
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
