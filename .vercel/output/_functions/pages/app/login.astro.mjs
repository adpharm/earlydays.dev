import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as renderScript } from '../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Bho3Qsfk.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<button id="login">Login</button> <button id="logout">Logout</button> ${renderScript($$result2, "/workspace/src/pages/app/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/workspace/src/pages/app/login.astro", void 0);

const $$file = "/workspace/src/pages/app/login.astro";
const $$url = "/app/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
