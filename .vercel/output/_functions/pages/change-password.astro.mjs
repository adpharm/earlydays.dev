import { c as createComponent, d as createAstro } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import 'clsx';
import { d as db, s as sessionsTable, u as usersTable } from '../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ChangePassword = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ChangePassword;
  if (Astro2.request.method === "POST") {
    try {
      const { newPassword } = await Astro2.request.json();
      if (typeof newPassword !== "string") {
        return new Response(
          JSON.stringify({ message: "Invalid request body." }),
          { status: 400 }
        );
      }
      const sessionToken = Astro2.cookies.get("sessionCookie")?.value;
      if (!sessionToken) {
        return new Response(JSON.stringify({ message: "Not logged in." }), {
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
        return new Response(JSON.stringify({ message: "Session invalid." }), {
          status: 401
        });
      }
      const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found." }), {
          status: 404
        });
      }
      const SALT_ROUNDS = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await db.update(usersTable).set({ password: hashedNewPassword }).where(eq(usersTable.id, user.id));
      return new Response(
        JSON.stringify({ message: "Password changed successfully." }),
        { status: 200 }
      );
    } catch (err) {
      console.error("Change password error:", err);
      return new Response(JSON.stringify({ message: "Server error." }), {
        status: 500
      });
    }
  }
  return new Response(null, { status: 405 });
}, "/workspace/src/pages/change-password.astro", void 0);

const $$file = "/workspace/src/pages/change-password.astro";
const $$url = "/change-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ChangePassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
