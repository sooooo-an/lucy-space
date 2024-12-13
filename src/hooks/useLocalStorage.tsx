import { LocalStorageKey, LocalStorageValueType } from '@/types/localStorage'
import { useCallback } from 'react'

export default function useLocalStorage() {
  const getLocalStorage = useCallback((key: LocalStorageKey) => {
    try {
      const value = localStorage.getItem(key)
      if (!value) return null
      return JSON.parse(value)
    } catch {
      console.error(`Failed to parse localStorage item for key: ${key}`)
      return null
    }
  }, [])

  const setLocalStorage = useCallback(
    <T extends LocalStorageKey>(key: T, value: LocalStorageValueType<T>) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    []
  )

  return {
    getLocalStorage,
    setLocalStorage,
  } as const
}
