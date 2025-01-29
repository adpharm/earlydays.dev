// src/pages/api/posts/[docId].ts

import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable } from "@/schema";

export const GET: APIRoute = async () => {
  try {
    // Fetch all the posts from the database
    const posts = await db.select().from(postsTable);

    if (!posts) {
      return new Response(JSON.stringify({ error: "Posts not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post data as JSON
    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
