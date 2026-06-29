import { getAllProjectsMeta } from "@/lib/projects";
import PostCard from "@/components/PostCard";
import type { CardItem } from "@/components/PostCard";

export const metadata = {
  title: "Projects - Danny Nelson",
};

export default function ProjectsPage() {
  const projects: CardItem[] = getAllProjectsMeta().map((p) => ({ ...p, category: "Project" }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
        <p className="mt-2 text-gray-600">Things I've built.</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet. Check back soon!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PostCard key={project.slug} post={project} />
          ))}
        </div>
      )}
    </div>
  );
}
