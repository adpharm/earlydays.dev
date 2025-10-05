import { c as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/_layout_CFwFyqHr.mjs';
import { d as db, s as sessionsTable, u as usersTable } from '../../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import { A as AdminNavigation } from '../../../chunks/AdminNavigation_D8rq2FRg.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
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
  const { userId } = Astro2.params;
  let user;
  try {
    const uId = Number(userId);
    if (isNaN(uId)) {
      throw new Error("Invalid post ID.");
    }
    const fetchedUsers = await db.select().from(usersTable).where(eq(usersTable.id, uId));
    const fetchedUser = fetchedUsers.at(0);
    if (!fetchedUser) {
      throw new Error("Post not found.");
    }
    user = fetchedUser;
  } catch (err) {
    err instanceof Error ? err.message : "Failed to fetch the user.";
    console.error(err);
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin" }
    });
  } finally {
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      gitUrl: formData.get("gitUrl"),
      profileSrc: formData.get("profileSrc"),
      userId: user.id
    };
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    console.log(formData, payload, baseUrl);
    try {
      const response = await fetch(`${baseUrl}/api/updateUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Request failed");
      }
      console.log("Successfully updated user");
    } catch (error2) {
      throw new Error("Unable to update user: " + error2.message);
    }
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin" }
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNavigation", AdminNavigation, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/AdminNavigation", "client:component-export": "AdminNavigation" })} ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100"> <div class="max-w-5xl mx-auto p-4 flex flex-col justify-start items-center"> <!-- Form Wrapper --> <form method="POST" class="bg-white shadow rounded-md p-6 w-full space-y-6"> <!-- Hidden input to store the image's src --> <input type="hidden" name="profileSrc" id="profileSrc"${addAttribute(user.profileSrc || "", "value")}> <div class="flex flex-row justify-start items-center"> ${renderComponent($$result2, "ImageUploader", null, { "imgSrc": user.profileSrc || "", "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/ImageUploader", "client:component-export": "default" })} <div class="flex flex-col justify-center items-start ml-6"> <label for="name" class="text-gray-700 font-semibold mb-2">Name</label> <input id="name" name="name" type="text" class="border border-gray-300 rounded-md p-2 text-gray-900"${addAttribute(user.name, "value")}> </div> </div> <!-- Read Time --> <div class="flex flex-col"> <label for="email" class="text-gray-700 font-semibold mb-2">Email</label> <div class="flex flex-row items-center space-x-2"> <input id="email" name="email" type="email" class="border border-gray-300 rounded-md p-2 text-gray-900 w-full"${addAttribute(user.email ?? "", "value")}> </div> </div> <!-- Labels --> <div class="flex flex-col"> <label for="gitUrl" class="text-gray-700 font-semibold mb-2">
Github URL
</label> <input id="gitUrl" name="gitUrl" type="text" class="border border-gray-300 rounded-md p-2 text-gray-900"${addAttribute(user.gitUrl ?? "", "value")}> </div> <!-- Save Changes Button --> <div class="w-full flex items-center justify-center"> <button type="submit" class="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-md transition-colors">
Save Changes
</button> </div> </form> </div> </div> ` })}`;
}, "/workspace/src/pages/u/[userId]/edit.astro", void 0);

const $$file = "/workspace/src/pages/u/[userId]/edit.astro";
const $$url = "/u/[userId]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
