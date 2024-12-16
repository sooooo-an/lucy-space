import IconButton from '@/components/IconButton'
import GithubIcon from '@/components/icons/GithubIcon'
import React from 'react'

export default function GithubButton() {
  return (
    <div className="flex gap-1 border-t border-t-border p-2 md:block md:border-t-0 md:p-0">
      <IconButton
        type="link"
        link="https://github.com/sooooo-an"
        icon={<GithubIcon />}
        isBlank
        text="Github 바로가기"
      />
    </div>
  )
}
