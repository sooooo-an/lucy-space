import BackButton from '@/components/common/BackButton'
import CldImage from '@/components/common/CldImage'
import NotionRichTextArray from '@/components/notions/NotionRichTextArray'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import React from 'react'

type Props = {
  children: React.ReactNode
  cover?: string | null
  icon?: string | null
  title: RichTextItemResponse[]
  isShowBackBtn?: boolean
}

export default function ContentLayout({ children, cover, title, icon, isShowBackBtn }: Props) {
  return (
    <main>
      {cover && (
        <CldImage
          src={cover}
          alt="cover"
          width={800}
          height={300}
          className="mb-5 h-40 w-full object-cover shadow-sm md:h-64"
        />
      )}

      <div className="container mx-auto px-4 lg:px-0">
        <div>
          {isShowBackBtn && <BackButton />}

          {icon && (
            <CldImage
              src={icon}
              alt="icon"
              width={100}
              height={100}
              className="mb-5 mt-10 h-32 w-32 rounded-2xl"
            />
          )}
          <h3 className="pt-2 text-2xl font-bold md:text-4xl">
            <NotionRichTextArray list={title} />
          </h3>
        </div>
        {children}
      </div>
    </main>
  )
}
