import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

type Props = {
  isDarkmode: boolean
}

export default function ThemeIcon({ isDarkmode }: Props) {
  return isDarkmode ? <MdLightMode /> : <MdDarkMode />
}
