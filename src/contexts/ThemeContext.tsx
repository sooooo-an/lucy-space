'use client'

import { THEME, Theme, ThemeProviderProps, UseThemeProps } from '@/types/theme'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
const defaultContext = { toggleTheme: () => {}, theme: THEME.LIGHT }

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(THEME.LIGHT)

  const setTheme = useCallback((theme: Theme) => {
    setThemeState(theme)
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [])

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem('theme') as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT)
    setTheme(storedTheme)
  }, [setTheme])

  const toggleTheme = () => {
    setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <ThemeScript defaultTheme={theme} />
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext) ?? defaultContext

const ThemeScript = ({ defaultTheme }: { defaultTheme: Theme }) => {
  const scriptArgs = JSON.stringify([defaultTheme]).slice(1, -1)

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(${script.toString()})(${scriptArgs})`,
      }}
    />
  )
}

const script = (defaultTheme: string) => {
  let theme
  try {
    theme = localStorage.getItem('theme') || defaultTheme
  } catch (e) {
    theme = defaultTheme
  }

  document.documentElement.style.colorScheme = theme
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
