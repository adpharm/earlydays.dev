import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable, sessionsTable, usersTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";

// Quick example function to estimate read time from text length:
function calculateReadTime(text: string): number {
  // As a simple approach, assume 1 minute per 200 words:
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Get session token from cookies
    const sessionToken = cookies.get("sessionCookie")?.value;
    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    // 2. Verify session
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

    // 3. Fetch the user
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId));

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // 4. Parse request data
    // Expecting JSON like: { title, content, tags, readTime }
    const { title, content, tags, readTime } = await request.json();
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content required." }),
        {
          status: 400,
        }
      );
    }

    // 5. Use provided readTime or fall back to a simple calculation
    const finalReadTime = readTime || calculateReadTime(content);

    // 6. Insert new post
    const [insertedPost] = await db
      .insert(postsTable)
      .values({
        title,
        content,
        tags,
        readTime: finalReadTime,
        author: user.id, // from session
      })
      .returning();

    // 7. Return the newly inserted post
    return new Response(JSON.stringify({ insertedPost }), {
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
