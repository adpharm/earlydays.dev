// src/pages/api/new-post.ts
import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable, sessionsTable } from "@/schema";
import { usersTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionToken = cookies.get("sessionCookie")?.value;
  if (!sessionToken) {
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }

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
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.userId));

  const [insertedPost] = await db
    .insert(postsTable)
    .values({
      author: user.id,
      isPublished: false,
      status: "draft",
    })
    .returning();

  return new Response(null, {
    status: 302,
    headers: { Location: `/p/${insertedPost.id}/edit` },
  });
};
