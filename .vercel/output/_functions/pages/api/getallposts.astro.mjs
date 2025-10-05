import { d as db, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const posts = await db.select().from(postsTable);
    if (!posts) {
      return new Response(JSON.stringify({ error: "Posts not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
