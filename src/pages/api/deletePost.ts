import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable } from "@/schema";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request }) => {
  console.log("received request: ", request);
  try {
    // Extract the postId from the request body
    const { postId } = await request.json();

    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert the postId to a number
    const id = Number(postId);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid postId format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the post from the database
    const result = await db.delete(postsTable).where(eq(postsTable.id, id));

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return a success message
    return new Response(
      JSON.stringify({ message: "Post deleted successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
