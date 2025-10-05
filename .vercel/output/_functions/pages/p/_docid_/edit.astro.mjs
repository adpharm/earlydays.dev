import { c as createComponent, d as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/_layout_CFwFyqHr.mjs';
import { d as db, s as sessionsTable, u as usersTable, p as postsTable } from '../../../chunks/schema_BY9iYp7h.mjs';
import { and, eq, gt } from 'drizzle-orm';
import { A as AdminNavigation } from '../../../chunks/AdminNavigation_D8rq2FRg.mjs';
import { CircleArrowLeft } from 'lucide-react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogClose } from '../../../chunks/dialog_g5O5AHEU.mjs';
import { d as deletePost } from '../../../chunks/utils_DWI7vIpo.mjs';
export { renderers } from '../../../renderers.mjs';

function ConfirmDeleteModal({ postId }) {
  const [errorText, setErrorText] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await deletePost(postId);
    console.log(response);
    if (response.status == 200) {
      return window.location.href = "/admin";
    } else {
      setErrorText(response.toString());
    }
  }
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white py-2 px-4 transition-colors text-sm", children: /* @__PURE__ */ jsx("p", { children: "Delete Post" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "p-6 bg-white rounded-md shadow-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "font-bold text-pink-700", children: "Are you sure you want to delete this post?" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "You will not be able to retrieve this post if you continue. If you would rather unpublish it, please do so instead." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        errorText != "" && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errorText }),
        /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-row h-full items-end justify-end space-x-2", children: [
          /* @__PURE__ */ jsx(DialogClose, { className: "rounded-md bg-zinc-300 text-black hover:bg-black hover:text-white transition-colors px-4 py-2 border border-zinc-300 hover:border-black", children: /* @__PURE__ */ jsx("p", { children: "Cancel" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "rounded-md border border-pink-600 text-bold text-pink-600 hover:bg-pink-600 hover:text-white hover:transition-colors px-6 py-2",
              children: "Confirm"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}

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
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
  const { docId } = Astro2.params;
  let post;
  try {
    const postId = Number(docId);
    if (isNaN(postId)) {
      throw new Error("Invalid post ID.");
    }
    const fetchedPosts = await db.select().from(postsTable).where(eq(postsTable.id, postId));
    const fetchedPost = fetchedPosts.at(0);
    if (!fetchedPost) {
      throw new Error("Post not found.");
    }
    post = fetchedPost;
  } catch (err) {
    err instanceof Error ? err.message : "Failed to fetch the post.";
    console.error(err);
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin" }
    });
  } finally {
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    ({
      title: formData.get("title"),
      content: formData.get("content")
      // Add other fields as necessary
    });
    return new Response(null, {
      status: 302,
      headers: { Location: "/admin" }
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminNavigation", AdminNavigation, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/AdminNavigation", "client:component-export": "AdminNavigation" })} ${maybeRenderHead()}<div class="min-h-screen bg-gradient-to-r from-pink-50 to-pink-100"> <div class="max-w-5xl mx-auto p-4 flex flex-col justify-start items-center space-y-4"> <div class="w-full flex flex-row justify-between items-center space-x-2 mt-2"> <div class="flex flex-row justify-center items-center space-x-4"> <a href="/admin">${renderComponent($$result2, "CircleArrowLeft", CircleArrowLeft, { "size": 32, "className": "text-pink-600" })}</a> <h1 class="text-2xl font-semibold text-pink-700">
Create a New Post
</h1> </div> ${renderComponent($$result2, "ConfirmDeleteModal", ConfirmDeleteModal, { "postId": post.id, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ConfirmDeleteModal", "client:component-export": "ConfirmDeleteModal" })} </div> <!-- Editor Wrapper --> <div class="bg-white shadow rounded-md py-10 w-full"> ${renderComponent($$result2, "Editor", null, { "user": user, "post": post, "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/Editor", "client:component-export": "default" })} </div> </div> </div> ` })}`;
}, "/workspace/src/pages/p/[docId]/edit.astro", void 0);

const $$file = "/workspace/src/pages/p/[docId]/edit.astro";
const $$url = "/p/[docId]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
