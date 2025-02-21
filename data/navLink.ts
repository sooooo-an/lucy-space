interface MenuType {
  name: string
  href: string
}

export const NAV_MENU: MenuType[] = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: '블로그',
    href: '/posts',
  },
  {
    name: '프로젝트',
    href: '/projects',
  },
]
