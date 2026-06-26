import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PROFANITY_LIST = [
  "ass", "asshole", "bastard", "bitch", "bollocks", "bullshit", "cock",
  "crap", "cunt", "damn", "dick", "douche", "fag", "fuck", "goddamn",
  "hell", "horseshit", "jackass", "motherfucker", "nigger", "nigga",
  "piss", "prick", "pussy", "shit", "slut", "twat", "wanker", "whore",
];

function isProfane(text: string): boolean {
  const lower = text.toLowerCase();
  return PROFANITY_LIST.some((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(lower);
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const { post_slug, author_name, author_email, content } = await req.json();

  if (!post_slug || !author_name?.trim() || !content?.trim()) {
    return new Response(
      JSON.stringify({ error: "Name and comment are required." }),
      { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
    );
  }

  if (isProfane(content) || isProfane(author_name)) {
    return new Response(
      JSON.stringify({ error: "Your comment contains inappropriate language. Please revise and try again." }),
      { status: 422, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error } = await supabase.from("comments").insert({
    post_slug,
    author_name: author_name.trim(),
    author_email: author_email || null,
    content: content.trim(),
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save comment." }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
  );
});
