import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

type Props = {
  isFolded: boolean
}

export default function FoldIcon({ isFolded }: Props) {
  return isFolded ? <IoIosArrowForward /> : <IoIosArrowBack />
}
