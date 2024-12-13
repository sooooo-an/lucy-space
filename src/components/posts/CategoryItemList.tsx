import React from 'react'
import Link from 'next/link'
import { CategoryData } from '@/types/post'
import { usePathname } from 'next/navigation'

type Props = {
  categories: CategoryData
  category: string
}

export default function CategoryItemList({ categories, category }: Props) {
  const pathname = usePathname()
  return (
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
  )
}
