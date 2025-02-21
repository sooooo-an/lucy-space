import React from 'react'

type Props = {
  children: React.ReactNode
  bgColor: string
  title: string
}

export default function SectionLayout({ children, bgColor, title }: Props) {
  return (
    <section className={`py-28 ${bgColor} px-4 lg:px-0`}>
      <div className="container mx-auto">
        <h2 className="pb-16 text-center text-3xl font-semibold">{title}</h2>
        {children}
      </div>
    </section>
  )
}
