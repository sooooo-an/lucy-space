'use client'

import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import ThemeIcon from './icons/ThemeIcon'
import IconButton from './IconButton'

export default function ThemeButton() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <IconButton
      type="button"
      onClick={toggleTheme}
      text="다크모드 설정"
      icon={<ThemeIcon isDarkmode={isDark} />}
    />
  )
}
