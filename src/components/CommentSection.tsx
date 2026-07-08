"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  postSlug: string;
  supabaseEdgeFunctionUrl: string;
  supabaseAnonKey: string;
}

export default function CommentSection({ postSlug, supabaseEdgeFunctionUrl, supabaseAnonKey }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchComments = useCallback(async () => {
    const { data } = await getSupabase()
      .from("comments")
      .select("id, author_name, content, created_at")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: true });
    if (data) setComments(data);
  }, [postSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch(supabaseEdgeFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          post_slug: postSlug,
          author_name: name.trim(),
          author_email: email.trim() || null,
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit comment.");
        return;
      }

      setName("");
      setEmail("");
      setContent("");
      setSuccess(true);
      await fetchComments();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
      <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">Comments</h3>

      {comments.length > 0 ? (
        <div className="mb-10 space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/60">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">{c.author_name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(c.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{c.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Leave a comment</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email <span className="text-gray-400 dark:text-gray-500">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Comment *
          </label>
          <textarea
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-600 dark:text-green-400">Comment posted!</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
