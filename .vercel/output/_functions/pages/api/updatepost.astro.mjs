import { d as db, s as sessionsTable, u as usersTable, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const sessionToken = cookies.get("sessionCookie")?.value;
    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401
      });
    }
    const now = /* @__PURE__ */ new Date();
    const [session] = await db.select().from(sessionsTable).where(
      and(
        eq(sessionsTable.token, sessionToken),
        gt(sessionsTable.expiresAt, now)
      )
    );
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session invalid or expired" }),
        {
          status: 401
        }
      );
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404
      });
    }
    const data = await request.json();
    console.log("PAYLOAD: ", data.payload);
    if (!data.payload.id) {
      return new Response(JSON.stringify({ error: "Post ID is required!" }), {
        status: 400
      });
    }
    const [updatedPost] = await db.update(postsTable).set({
      title: data.payload.title ?? "",
      readTime: data.payload.readTime ?? 0,
      author: user.id,
      tags: data.payload.tags ?? "",
      content: data.payload.content ?? "",
      isPublished: data.payload.isPublished ? true : false,
      status: data.payload.status ?? "draft",
      publishedId: data.payload.publishedId ?? 0
    }).where(eq(postsTable.id, data.payload.id)).returning();
    return new Response(JSON.stringify({ updatedPost }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
