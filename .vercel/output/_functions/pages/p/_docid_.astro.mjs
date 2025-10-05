import { c as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/_layout_CFwFyqHr.mjs';
import { d as db, p as postsTable } from '../../chunks/schema_BY9iYp7h.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$docId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$docId;
  const { docId } = Astro2.params;
  let post = null;
  try {
    const postId = Number(docId);
    post = (await db.select().from(postsTable).where(eq(postsTable.id, postId))).at(0);
    if (!post) {
      throw new Error("Post not found.");
    }
  } catch (err) {
    err instanceof Error ? err.message : "Failed to fetch the post.";
    console.error(err);
  } finally {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div> ${post && renderTemplate`${renderComponent($$result2, "Viewer", null, { "content": post.content || "", "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/Viewer", "client:component-export": "default" })}`} </div> ` })}`;
}, "/workspace/src/pages/p/[docId].astro", void 0);

const $$file = "/workspace/src/pages/p/[docId].astro";
const $$url = "/p/[docId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$docId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
