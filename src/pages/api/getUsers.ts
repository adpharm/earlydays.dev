import type { APIRoute } from "astro";
import { db } from "@/db";
import { usersTable } from "@/schema";

export const GET: APIRoute = async () => {
  try {
    // Fetch all the posts from the database
    const users = await db.select().from(usersTable);

    if (!users) {
      return new Response(JSON.stringify({ error: "Users not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the post data as JSON
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
