import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostSidebarProps {
  posts: PostMeta[];
  currentSlug: string;
}

export default function PostSidebar({ posts, currentSlug }: PostSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-8">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        All Posts
      </h3>
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                post.slug === currentSlug
                  ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <span className="truncate pr-3">{post.title}</span>
              <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                {post.comingSoon ? "SOON" : `${post.readingTime}m`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
