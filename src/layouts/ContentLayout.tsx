import BackButton from '@/components/common/BackButton'
import NotionRichTextArray from '@/components/notions/NotionRichTextArray'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
  cover?: string | null
  icon?: string | null
  title: RichTextItemResponse[]
}

export default function ContentLayout({ children, cover, title }: Props) {
  return (
    <main>
      {cover && (
        <Image
          src={cover}
          alt="cover"
          width={800}
          height={300}
          className="mb-5 h-40 w-full object-cover shadow-sm md:h-64"
          priority
        />
      )}

      <div className="container mx-auto px-4 lg:px-0">
        <div>
          <BackButton />
          <h3 className="pt-2 text-4xl font-semibold">
            <NotionRichTextArray list={title} />
          </h3>
        </div>
        {children}
      </div>
    </main>
  )
}
