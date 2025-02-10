import type { APIRoute } from "astro";
import { db } from "@/db";
import { usersTable, sessionsTable } from "@/schema";
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
    const { name, email, gitUrl, profileSrc, userId } = await request.json();
    if (!name || !email || !gitUrl || !profileSrc || !userId) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        {
          status: 400,
        }
      );
    }

    // Update user in the database
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        name,
        email,
        gitUrl,
        profileSrc,
      })
      .where(eq(usersTable.id, userId))
      .returning();

    // Return the updated user
    return new Response(JSON.stringify({ updatedUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("ERROR IN API ROUTE: ", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
