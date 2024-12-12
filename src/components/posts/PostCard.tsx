import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { path, thumbnail, title, description } = post;

  return (
    <Link href={`/posts/${path}`}>
      <article className="mb-2 overflow-hidden">
        <Image
          className="rounded-lg w-full"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={250}
          height={200}
        />
        <div className="py-2">
          <h3 className="font-bold text-xl pb-2 truncate text-text-primary">
            {title}
          </h3>
          <p className="pb-4 text-text-secondary">{description}</p>
        </div>
      </article>
    </Link>
  );
}
