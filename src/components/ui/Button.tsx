import { UIColorType } from '@/types/ui'
import React from 'react'

type Props = (ButtonTypeProps | SubmitTypeProps) & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  const { text, color, onClick } = props
  return (
    <button
      className={`mb-1 mt-2 h-12 w-full rounded-lg font-bold ${
        props.disabled ? DISABLED_CLASS : COLOR_CLASS[color]
      }`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

type ButtonTypeProps = {
  type: 'button'
  onClick: () => void
  text: string
  color: UIColorType
}

type SubmitTypeProps = {
  type: 'submit'
  onClick?: () => void
  text: string
  color: UIColorType
}

const COLOR_CLASS: Record<UIColorType, string> = {
  primary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  primary_outline: 'border border-yellow-500 text-yellow-500',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-black',
  secondary_outline: 'border border-gray-500 text-gray-500',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  dander_full: 'border red-gray-500 text-red-500 ',
}

const DISABLED_CLASS = 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
