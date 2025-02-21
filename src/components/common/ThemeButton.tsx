'use client'

import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import IconButton from '../ui/IconButton'
import ThemeIcon from '../icons/ThemeIcon'
import { THEME } from '@/types/theme'

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === THEME.DARK

  const onClick = () => {
    toggleTheme(isDark ? THEME.LIGHT : THEME.DARK)
  }

  return (
    <div className="flex gap-1 border-t border-t-border p-2 md:block md:border-t-0 md:p-0">
      <IconButton
        type="button"
        onClick={onClick}
        text="다크모드 설정"
        icon={<ThemeIcon isDarkmode={isDark} />}
      />
    </div>
  )
}
