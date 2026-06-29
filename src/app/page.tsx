import { getAllPostsMeta } from "@/lib/posts";
import { getAllProjectsMeta } from "@/lib/projects";
import PostCard from "@/components/PostCard";
import type { CardItem } from "@/components/PostCard";

export default function HomePage() {
  const posts: CardItem[] = getAllPostsMeta().map((p) => ({ ...p, category: "Blog" }));
  const projects: CardItem[] = getAllProjectsMeta().map((p) => ({ ...p, category: "Project" }));
  const items = [...posts, ...projects].sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Latest</h1>
        <p className="mt-2 text-gray-600">
          Recent blog posts and projects.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">Nothing here yet. Check back soon!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PostCard key={`${item.category}-${item.slug}`} post={item} />
          ))}
        </div>
      )}
    </div>
  );
}
