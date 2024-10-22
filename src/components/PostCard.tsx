import { parseDate } from "@/app/utils/date";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { path, thumbnail, title, date, description } = post;

  return (
    <Link href={`/posts/${path}`}>
      <article className="border-b py-4 flex">
        <Image
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={300}
          height={200}
        />
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <time>{parseDate(date)}</time>
        </div>
      </article>
    </Link>
  );
}
