import { c as createComponent, d as createAstro } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import 'clsx';
import { d as db, s as sessionsTable } from '../chunks/schema_BY9iYp7h.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  const sessionToken = Astro2.cookies.get("sessionCookie")?.value;
  if (sessionToken) {
    await db.delete(sessionsTable).where(eq(sessionsTable.token, sessionToken));
  }
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": `sessionCookie=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    }
  });
}, "/workspace/src/pages/logout.astro", void 0);

const $$file = "/workspace/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
