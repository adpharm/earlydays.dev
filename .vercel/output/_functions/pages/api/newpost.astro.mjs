import { d as db, s as sessionsTable, u as usersTable, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const sessionToken = cookies.get("sessionCookie")?.value;
  if (!sessionToken) {
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }
  const now = /* @__PURE__ */ new Date();
  const [session] = await db.select().from(sessionsTable).where(
    and(
      eq(sessionsTable.token, sessionToken),
      gt(sessionsTable.expiresAt, now)
    )
  );
  if (!session) {
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
  const [insertedPost] = await db.insert(postsTable).values({
    author: user.id,
    isPublished: false,
    status: "draft"
  }).returning();
  return new Response(null, {
    status: 302,
    headers: { Location: `/p/${insertedPost.id}/edit` }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
