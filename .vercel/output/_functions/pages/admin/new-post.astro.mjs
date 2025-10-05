import { c as createComponent, d as createAstro } from '../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import 'clsx';
import '../../chunks/_layout_CFwFyqHr.mjs';
import { d as db, s as sessionsTable, u as usersTable, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import 'react/jsx-runtime';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$NewPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewPost;
  const sessionToken = Astro2.cookies.get("sessionCookie")?.value;
  if (!sessionToken) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" }
    });
  }
  const now = /* @__PURE__ */ new Date();
  const [session] = await db.select().from(sessionsTable).where(
    and(eq(sessionsTable.token, sessionToken), gt(sessionsTable.expiresAt, now))
  );
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" }
    });
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
}, "/workspace/src/pages/admin/new-post.astro", void 0);

const $$file = "/workspace/src/pages/admin/new-post.astro";
const $$url = "/admin/new-post";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NewPost,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
