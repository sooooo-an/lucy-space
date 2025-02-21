import Categories from '@/components/blog/Categories'
import MobileCategories from '@/components/blog/MobileCategories'
import { CategoryData } from '@/types/post'
import React from 'react'

type Props = {
  categories: CategoryData
  children: React.ReactNode
}

export default function PostLayout({ categories, children }: Props) {
  return (
    <main className="flex h-full min-h-0 flex-col items-center">
      <div className="container flex flex-1">
        <section className="hidden w-1/5 flex-shrink-0 border-r border-r-border bg-transparent lg:block">
          <Categories categories={categories} />
        </section>
        <section className="lg:hidden">
          <MobileCategories categories={categories} />
        </section>
        <section className="block w-full p-2">{children}</section>
      </div>
    </main>
  )
}
