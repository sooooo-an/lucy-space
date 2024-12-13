import React from 'react'
import FoldIcon from '../ui/icons/FoldIcon'

type Props = {
  onToggle: () => void
  isFolded: boolean
}

export default function FoldButton({ onToggle, isFolded }: Props) {
  return (
    <button
      className="absolute -right-6 top-1/2 flex h-20 w-6 -translate-y-1/2 items-center justify-center rounded-br-2xl rounded-tr-2xl bg-text-secondary/90 text-white lg:hidden"
      onClick={onToggle}
    >
      <FoldIcon isFolded={isFolded} />
    </button>
  )
}
