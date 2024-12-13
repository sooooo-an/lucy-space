export const LOCAL_STORAGE_KEY = {
  IS_DARK: 'isDark',
} as const

type LocalStorageValue = {
  [LOCAL_STORAGE_KEY.IS_DARK]: boolean
}

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEY)[keyof typeof LOCAL_STORAGE_KEY]

export type LocalStorageValueType<T extends LocalStorageKey> = LocalStorageValue[T]
