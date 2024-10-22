import { parseDate } from "@/app/utils/date";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { path, thumbnail, title, date, description, category } = post;

  return (
    <Link href={`/posts/${path}`}>
      <article className="border-t py-6 mb-4 items-center relative sm:flex gap-4">
        <Image
          className="rounded-lg w-full sm:w-[200px] md:w-[250px]"
          src={`/images/posts/${thumbnail}`}
          alt={title}
          width={250}
          height={200}
        />
        <div className="truncate lg:overflow-visible lg:whitespace-normal py-2">
          <h3 className="font-bold text-xl pb-2 truncate lg:overflow-visible lg:whitespace-normal">
            {title}
          </h3>
          <p className="pb-4 truncate lg:overflow-visible lg:whitespace-normal">
            {description}
          </p>
          <span className="rounded-2xl border border-purple-600 text-purple-600 px-2 py-1 text-sm">
            {category}
          </span>
          <time className="absolute bottom-4 right-4 text-sm text-gray-500">
            {parseDate(date)}
          </time>
        </div>
      </article>
    </Link>
  );
}
