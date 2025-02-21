import React from 'react'
import DropdownIcon from '../icons/DropdownIcon'

type Props = {
  onToggle: () => void
  isOpen: boolean
}

export default function MobileNavButton({ onToggle, isOpen }: Props) {
  return (
    <button
      className="absolute right-3 flex items-center text-text-primary md:hidden"
      onClick={onToggle}
    >
      메뉴
      <DropdownIcon isOpen={isOpen} />
    </button>
  )
}
