import { c as createComponent, b as renderTemplate } from '../../chunks/astro/server_lvFGk3__.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$userId = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/workspace/src/pages/u/[userId].astro", void 0);

const $$file = "/workspace/src/pages/u/[userId].astro";
const $$url = "/u/[userId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$userId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
