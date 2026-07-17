import { getAllPostSlugs, getAllPostsMeta, getPostBySlug } from "@/lib/posts";
import HeroBanner from "@/components/HeroBanner";
import PostSidebar from "@/components/PostSidebar";
import CommentSection from "@/components/CommentSection";

const COMMENTS_ENABLED = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = `${post.title} — D. Nelson`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      images: post.heroImage ? [{ url: post.heroImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = getAllPostsMeta();

  const edgeFunctionUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/moderate-comment`
    : "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
        <article>
          <HeroBanner src={post.heroImage} alt={post.title} />

          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {post.comingSoon ? (
                <span>Coming soon</span>
              ) : (
                <>
                  <time>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              {post.title}
            </h1>
          </div>

          {post.comingSoon ? (
            <p className="mt-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">{post.excerpt}</p>
          ) : (
            <div
              className="prose prose-gray dark:prose-invert mt-8 max-w-none prose-headings:font-semibold prose-a:text-blue-700 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          )}

          {COMMENTS_ENABLED && (
            <CommentSection postSlug={slug} supabaseEdgeFunctionUrl={edgeFunctionUrl} supabaseAnonKey={anonKey} />
          )}
        </article>

        <div className="mt-10 lg:mt-0">
          <PostSidebar posts={allPosts} currentSlug={slug} />
        </div>
      </div>
    </div>
  );
}
