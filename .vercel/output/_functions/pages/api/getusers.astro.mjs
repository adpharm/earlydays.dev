import { d as db, u as usersTable } from '../../chunks/schema_BY9iYp7h.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const users = await db.select().from(usersTable);
    if (!users) {
      return new Response(JSON.stringify({ error: "Users not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
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
