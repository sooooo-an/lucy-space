'use client'

import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import IconButton from './IconButton'
import ThemeIcon from './icons/ThemeIcon'

export default function ThemeButton() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <div className="flex gap-1 border-t border-t-border p-2 md:block md:border-t-0 md:p-0">
      <IconButton
        type="button"
        onClick={toggleTheme}
        text="다크모드 설정"
        icon={<ThemeIcon isDarkmode={isDark} />}
      />
    </div>
  )
}
