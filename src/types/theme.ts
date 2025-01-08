import { PropsWithChildren } from 'react'

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type Theme = (typeof THEME)[keyof typeof THEME]

export type UseThemeProps = {
  theme: Theme
  toggleTheme: (value: Theme) => void
}

export type ThemeProviderProps = {} & PropsWithChildren
