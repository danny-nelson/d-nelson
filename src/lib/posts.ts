import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { calculateReadingTime } from "./reading-time";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  contentHtml: string;
  comingSoon?: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  comingSoon?: boolean;
}

const postsDirectory = path.join(process.cwd(), "blogs");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        heroImage: data.heroImage || "",
        readingTime: calculateReadingTime(content),
        comingSoon: data.comingSoon || false,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(remarkGfm).use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    heroImage: data.heroImage || "",
    readingTime: calculateReadingTime(content),
    contentHtml: processed.toString(),
    comingSoon: data.comingSoon || false,
  };
}
