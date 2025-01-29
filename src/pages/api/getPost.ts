// src/pages/api/posts/[docId].ts

import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable } from "@/schema";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request }) => {
  console.log("received request");
  try {
    // Extract the docId from the URL parameters
    const { docId } = await request.json();

    if (!docId) {
      return new Response(JSON.stringify({ error: "docId is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert the docId to a number
    const id = Number(docId);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid docId format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the post from the database
    const post = (
      await db.select().from(postsTable).where(eq(postsTable.id, id))
    ).at(0);

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post data as JSON
    return new Response(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
