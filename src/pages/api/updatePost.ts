import type { APIRoute } from "astro";
import { db } from "@/db";
import { usersTable, sessionsTable, postsTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Get session token from cookies
    const sessionToken = cookies.get("sessionCookie")?.value;
    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    // Verify session
    const now = new Date();
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(
        and(
          eq(sessionsTable.token, sessionToken),
          gt(sessionsTable.expiresAt, now)
        )
      );

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session invalid or expired" }),
        {
          status: 401,
        }
      );
    }

    // Fetch the user
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId));

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Parse request data
    const data = await request.json();

    console.log("PAYLOAD: ", data.payload);

    if (!data.payload.id) {
      return new Response(JSON.stringify({ error: "Post ID is required!" }), {
        status: 400,
      });
    }

    // Update user in the database
    const [updatedPost] = await db
      .update(postsTable)
      .set({
        title: data.payload.title ?? "",
        readTime: data.payload.readTime ?? 0,
        author: user.id,
        tags: data.payload.tags ?? "",
        content: data.payload.content ?? "",
        isPublished: data.payload.isPublished ? true : false,
        status: data.payload.status ?? "draft",
        publishedId: data.payload.publishedId ?? 0,
      })
      .where(eq(postsTable.id, data.payload.id))
      .returning();

    // Return the updated user
    return new Response(JSON.stringify({ updatedPost }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
