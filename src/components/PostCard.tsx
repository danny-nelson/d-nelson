import Link from "next/link";
import Image from "next/image";

export interface CardItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  comingSoon?: boolean;
}

interface PostCardProps {
  post: CardItem;
}

export default function PostCard({ post }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  const card = (
    <article className={`flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 transition-shadow dark:border-gray-800 ${
      post.comingSoon ? "opacity-80" : "hover:shadow-md dark:hover:shadow-gray-900/50"
    }`}>
      <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-800">
        {post.heroImage ? (
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
            <span>No image</span>
          </div>
        )}
        {post.comingSoon && (
          <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm dark:bg-amber-900/60 dark:text-amber-200">
            Coming Soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {post.comingSoon ? (
            <span>Coming soon</span>
          ) : (
            <>
              <span>{post.readingTime} min read</span>
              <span>&middot;</span>
              <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
            </>
          )}
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400">
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3 dark:text-gray-400">{post.excerpt}</p>
      </div>
    </article>
  );

  return (
    <Link href={href} className="group block h-full">
      {card}
    </Link>
  );
}
