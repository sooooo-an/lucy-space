export type UIColorType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'primary_outline'
  | 'secondary_outline'
  | 'dander_full'

type LinkType = {
  type: 'link'
  link: string
  isBlank?: boolean
}

type ButtonType = {
  type: 'button'
  onClick: () => void
}

export type IconButtonType = {
  icon: React.ReactNode
  text?: string
} & (LinkType | ButtonType)
