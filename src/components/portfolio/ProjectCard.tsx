import GithubIcon from '../icons/GithubIcon'
import DocsIcon from '../icons/MoveIcon'
import LinkIcon from '../icons/LinkIcon'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@data/project'

type Props = { isMargin?: boolean; color: string; project: Project }

export default function ProjectCard({
  project: { name, thumbnail, desc, links },
  isMargin = false,
  color,
}: Props) {
  return (
    <div
      key={name}
      className={`relative h-[550px] w-[318px] rounded-[20px] p-4 shadow-md ${color} ${isMargin && 'lg:mt-32'}`}
    >
      <Image
        priority
        src={thumbnail}
        alt={name}
        width={450}
        height={450}
        className="absolute -left-1 max-w-[403px]"
      />
      <div className="pt-[300px]">
        <p className="w-[84px] break-words pb-6 text-2xl font-bold">{name}</p>
        <p className="flex flex-col">
          {desc.map((str) => (
            <span key={str}>{str}</span>
          ))}
        </p>
        <div className="absolute bottom-5 flex gap-3 text-xl">
          {links.github && (
            <Link href={links.github} target="_blank">
              <GithubIcon />
            </Link>
          )}
          {links.path && (
            <Link href={links.path}>
              <DocsIcon />
            </Link>
          )}
          {links.url && (
            <Link href={links.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
