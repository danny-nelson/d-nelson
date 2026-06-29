import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { calculateReadingTime } from "./reading-time";

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  heroImage: string;
  readingTime: number;
  comingSoon?: boolean;
}

export interface Project extends ProjectMeta {
  contentHtml: string;
}

const projectsDirectory = path.join(process.cwd(), "projects");

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs
    .readdirSync(projectsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllProjectsMeta(): ProjectMeta[] {
  const slugs = getAllProjectSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(projectsDirectory, `${slug}.md`);
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

export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    heroImage: data.heroImage || "",
    readingTime: calculateReadingTime(content),
    contentHtml: processed.toString(),
  };
}
