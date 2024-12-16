import { CategoryData } from '@/types/post'
import React from 'react'

import CategoryItem from './CategoryItem'

type Props = {
  categories: CategoryData
}

export default function Categories({ categories }: Props) {
  return (
    <ul className="sticky top-20 p-4">
      {Object.keys(categories).map((category) => (
        <CategoryItem categories={categories} category={category} key={category} />
      ))}
    </ul>
  )
}
