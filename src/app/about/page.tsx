import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Danny Nelson",
  description: "Learn more about Danny Nelson.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">About</h1>

      <div className="prose prose-gray mt-8 max-w-none prose-headings:font-semibold">
        <p>
          Hi, I&apos;m Danny Nelson. Welcome to my corner of the internet.
        </p>

        <h2>What I Do</h2>
        <p>
          This is a placeholder — replace this section with details about your
          professional background, skills, and current role.
        </p>

        <h2>Why This Blog</h2>
        <p>
          I started this blog to share my thoughts, document my journey, and
          connect with like-minded people. Replace this with your own story.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Feel free to reach out via{" "}
          <a
            href="https://www.linkedin.com/in/danny-nelson86/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          or leave a comment on any of my blog posts.
        </p>
      </div>
    </div>
  );
}
