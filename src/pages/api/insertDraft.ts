import type { APIRoute } from "astro";
import { db } from "@/db";
import { postsTable, sessionsTable, usersTable } from "@/schema";
import { eq, and, gt } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as cheerio from "cheerio";

export const POST: APIRoute = async ({ cookies }) => {
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

    // Insert new post
    const [insertedPost] = await db
      .insert(postsTable)
      .values({
        author: user.id,
      })
      .returning();

    // Return the newly inserted post
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
