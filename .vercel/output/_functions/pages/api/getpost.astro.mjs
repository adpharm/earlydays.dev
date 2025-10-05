import { d as db, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("received request");
  try {
    const { docId } = await request.json();
    if (!docId) {
      return new Response(JSON.stringify({ error: "docId is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const id = Number(docId);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid docId format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const post = (await db.select().from(postsTable).where(eq(postsTable.id, id))).at(0);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
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
