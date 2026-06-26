import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md">
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
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
