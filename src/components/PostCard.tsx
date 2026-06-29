import Link from "next/link";
import Image from "next/image";

export interface CardItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  category: "Blog" | "Project";
  comingSoon?: boolean;
}

interface PostCardProps {
  post: CardItem;
}

export default function PostCard({ post }: PostCardProps) {
  const href = post.category === "Blog" ? `/blog/${post.slug}` : `/projects/${post.slug}`;

  const card = (
    <article className={`flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 transition-shadow ${
      post.comingSoon ? "opacity-80" : "hover:shadow-md"
    }`}>
      <div className="relative aspect-[16/9] bg-gray-100">
        {post.heroImage ? (
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <span>No image</span>
          </div>
        )}
        {post.comingSoon && (
          <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">
            Coming Soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <span className={`rounded-full px-2.5 py-0.5 font-medium ${
            post.category === "Blog"
              ? "bg-blue-50 text-blue-700"
              : "bg-emerald-50 text-emerald-700"
          }`}>
            {post.category}
          </span>
          <span>&middot;</span>
          <span>{post.readingTime} min read</span>
          <span>&middot;</span>
          <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
          <span>&middot;</span>
          <span>Danny Nelson</span>
        </div>
        <h2 className={`mb-2 text-lg font-semibold text-gray-900 transition-colors ${
          post.comingSoon
            ? ""
            : post.category === "Blog" ? "group-hover:text-blue-700" : "group-hover:text-emerald-700"
        }`}>
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
      </div>
    </article>
  );

  if (post.comingSoon) {
    return <div className="block h-full cursor-default">{card}</div>;
  }

  return (
    <Link href={href} className="group block h-full">
      {card}
    </Link>
  );
}
