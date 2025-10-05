import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as renderScript, f as addAttribute } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/_layout_CFwFyqHr.mjs';
import { d as db, p as postsTable, u as usersTable } from '../chunks/schema_BY9iYp7h.mjs';
export { renderers } from '../renderers.mjs';

const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await db.select().from(postsTable);
  console.log("Posts: ", posts);
  const users = await db.select().from(usersTable);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex flex-col justify-center items-center text-center"> <div class="w-full max-w-5xl min-h-screen text-black p-4"> <div class="w-full h-32 flex flex-col justify-center items-center px-10 space-y-2"> <h1 class="font-bold text-4xl">earlydays.dev</h1> <p class="text-gray-600 text-sm">
Insights, Updates, and Stories from the Codebase
</p> </div> ${posts.map((post) => renderTemplate`<div id="post-card"${addAttribute(post.id, "data-index")} class="p-4 border rounded-xl shadow-lg w-full flex flex-row items-stretch justify-between mb-6 hover:cursor-pointer"> <div class="flex flex-col items-start justify-center space-y-2 w-full p-2 px-4"> <h2 class="text-xl font-bold text-indigo-400">${post.title}</h2> <p class="text-sm text-gray-600"> ${post.createdAt.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
• ${post.readTime} min read
</p> ${(() => {
    const user = users.find((usr) => usr.id === post.author);
    return renderTemplate`<div class="flex flex-row items-stretch justify-between w-full space-x-4"> <div class="flex flex-row justify-center items-center space-x-2"> <img class="w-6 h-6 rounded-full overflow-hidden content-fit"${addAttribute(user?.profileSrc, "src")}${addAttribute(user?.name || "", "alt")}> <p>${user?.name || ""}</p> <span>•</span> <a${addAttribute(user?.gitUrl, "href")} target="_blank" class="text-sm text-indigo-400 font-bold hover:underline">
Github
</a> </div> <div class="flex flex-row justify-center items-center"> <div class="flex flex-row justify-center items-center space-x-1 w-1/2"> ${post.tags.split(",").map((tag) => renderTemplate`<div class="flex justify-center items-center text-sm px-4 py-1 rounded-full bg-indigo-200 text-indigo-600"> ${tag} </div>`)} </div> </div> </div>`;
  })()} </div> </div>`)} </div> </div> ${renderScript($$result2, "/workspace/src/pages/posts.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspace/src/pages/posts.astro", void 0);

const $$file = "/workspace/src/pages/posts.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Posts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
