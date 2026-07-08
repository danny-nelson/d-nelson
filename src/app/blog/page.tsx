import { getAllPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import type { CardItem } from "@/components/PostCard";

export const metadata = {
  title: "Blog - Danny Nelson",
};

export default function BlogPage() {
  const posts: CardItem[] = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Blog</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Thoughts and ideas.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
