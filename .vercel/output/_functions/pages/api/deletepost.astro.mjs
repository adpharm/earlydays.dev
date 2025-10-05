import { d as db, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  console.log("received request: ", request);
  try {
    const { postId } = await request.json();
    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const id = Number(postId);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid postId format." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await db.delete(postsTable).where(eq(postsTable.id, id));
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(
      JSON.stringify({ message: "Post deleted successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
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
