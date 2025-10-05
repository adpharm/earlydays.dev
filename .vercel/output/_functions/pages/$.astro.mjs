import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/_layout_CFwFyqHr.mjs';
/* empty css                             */
import { C as CustomButton } from '../chunks/CustomButton_kgQYfk_Z.mjs';
export { renderers } from '../renderers.mjs';

const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex justify-center items-center"> <div class="w-full max-w-4xl flex justify-center items-center"> <h1>404 Not Found</h1> <p>We're not sure how you got here...</p> ${renderComponent($$result2, "CustomButton", CustomButton, { "content": "Go home", "link": true, "href": "/", "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/CustomButton", "client:component-export": "CustomButton" })} </div> </div> ` })}`;
}, "/workspace/src/pages/$.astro", void 0);

const $$file = "/workspace/src/pages/$.astro";
const $$url = "/$";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
