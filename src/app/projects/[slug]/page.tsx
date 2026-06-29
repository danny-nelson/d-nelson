import { getAllProjectSlugs, getAllProjectsMeta, getProjectBySlug } from "@/lib/projects";
import HeroBanner from "@/components/HeroBanner";
import PostSidebar from "@/components/PostSidebar";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: `${project.title} — D. Nelson`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const allProjects = getAllProjectsMeta();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
        <article>
          <HeroBanner src={project.heroImage} alt={project.title} />

          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <time>
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{project.readingTime} min read</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {project.title}
            </h1>
          </div>

          <div
            className="prose prose-gray mt-8 max-w-none prose-headings:font-semibold prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </article>

        <div className="mt-10 lg:mt-0">
          <PostSidebar posts={allProjects} currentSlug={slug} />
        </div>
      </div>
    </div>
  );
}
