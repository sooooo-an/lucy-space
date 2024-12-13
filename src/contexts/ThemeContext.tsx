'use client'

import useLocalStorage from '@/hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '@/types/localStorage'
import React, { createContext, useCallback, useEffect, useState } from 'react'

type ThemeProviderType = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeProviderType>({
  isDark: false,
  toggleTheme: () => {},
})

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage()
  const [isDark, setDark] = useState(false)

  const updateDarMode = useCallback(
    (isDark: boolean) => {
      const htmlEl = document.querySelector('html')
      htmlEl?.classList.toggle('dark', isDark)
      setLocalStorage(LOCAL_STORAGE_KEY.IS_DARK, isDark)
    },
    [setLocalStorage]
  )

  useEffect(() => {
    const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = getLocalStorage(LOCAL_STORAGE_KEY.IS_DARK) ?? osTheme
    setDark(isDark)
    updateDarMode(isDark)
  }, [getLocalStorage, updateDarMode])

  const toggleTheme = () => {
    setDark((prev) => !prev)
    updateDarMode(!isDark)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
