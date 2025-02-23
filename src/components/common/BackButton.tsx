'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 rounded-md p-1 text-sm transition-colors ease-linear hover:bg-primary/10"
    >
      <ArrowLeftIcon />
      뒤로가기
    </button>
  )
}
