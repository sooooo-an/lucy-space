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
