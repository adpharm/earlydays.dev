import { c as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/_layout_CFwFyqHr.mjs';
import * as bcrypt from 'bcrypt';
import { d as db, u as usersTable, s as sessionsTable } from '../chunks/schema_BY9iYp7h.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let errorMessage = "";
  function generateSessionToken() {
    return Math.random().toString(36).slice(2) + "-" + Math.random().toString(36).slice(2);
  }
  if (Astro2.request.method === "POST") {
    const contentType = Astro2.request.headers.get("Content-Type") || "";
    console.log("Received Content-Type:", contentType);
    contentType.startsWith("multipart/form-data");
    try {
      const data = await Astro2.request.formData();
      const email = data.get("email");
      const password = data.get("password");
      if (typeof email !== "string" || typeof password !== "string") {
        throw new Error("Invalid form submission.");
      }
      const user = (await db.select().from(usersTable).where(eq(usersTable.email, email))).at(0);
      if (user && user.password) {
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error("Invalid password.");
        }
      } else {
        throw new Error("Invalid password.");
      }
      console.log("Valid login");
      const sessionToken = generateSessionToken();
      const expiresAt = new Date(Date.now() + 10060 * 6e4);
      await db.insert(sessionsTable).values({
        token: sessionToken,
        userId: user.id,
        expiresAt
      });
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/admin",
          // mark HttpOnly so it can’t be accessed by JS
          "Set-Cookie": `sessionCookie=${sessionToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
        }
      });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Login error";
      console.error(errorMessage);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex flex-col justify-center items-center text-center"> <div class="w-full min-h-screen text-black p-4 flex justify-center items-start mt-32"> <div class="w-full flex flex-col justify-center items-center p-10 py-14 rounded-2xl shadow-lg bg-gray-100 max-w-lg"> <h1 class="text-2xl font-bold">Login</h1> <form method="POST" enctype="application/x-www-form-urlencoded" class="flex flex-col justify-center items-center pt-8"> <label>Email Address </label> <input type="email" name="email" class="border border-gray-500 mb-6 p-2 rounded-xl" required> <label>Password</label> <input type="password" name="password" class="border border-gray-500 mb-6 p-2 rounded-xl" required> <button type="submit" class="rounded-full px-10 py-2 border-8 border-indigo-300 bg-indigo-500 text-white font-bold">Login</button> </form> </div> </div> </div> ` })}`;
}, "/workspace/src/pages/login.astro", void 0);

const $$file = "/workspace/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
