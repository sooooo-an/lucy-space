import { Post } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  const { path, thumbnail, title, description, category } = post

  return (
    <Link href={`/posts/${path}`} className="group transition">
      <article className="relative mb-2 overflow-hidden">
        <span className="absolute right-2 top-2 rounded-md bg-primary px-2 py-[2px] text-sm font-semibold text-white">
          {category}
        </span>
        <Image
          className="w-full rounded-lg"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={250}
          height={200}
        />
        <div className="py-2 group-hover:text-primary">
          <h3 className="truncate pb-2 text-xl font-bold">{title}</h3>
          <p className="pb-4">{description}</p>
        </div>
      </article>
    </Link>
  )
}
