import React from 'react'

type Props = {
  children: React.ReactNode
  bgColor: string
}

export default function Panel({ children, bgColor }: Props) {
  return (
    <section
      className="h-full w-full rounded-3xl p-5 shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </section>
  )
}
