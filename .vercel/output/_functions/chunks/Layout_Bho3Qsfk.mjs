import { c as createComponent, d as createAstro, f as addAttribute, g as renderSlot, h as renderHead, r as renderComponent, b as renderTemplate } from './astro/server_lvFGk3__.mjs';
import 'kleur/colors';
/* empty css                         */
import { jsx } from 'react/jsx-runtime';
import { useTheme } from 'next-themes';
import { Toaster as Toaster$1 } from 'sonner';

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-zinc-950 dark:group-[.toaster]:text-zinc-50 dark:group-[.toaster]:border-zinc-800",
          description: "group-[.toast]:text-zinc-500 dark:group-[.toast]:text-zinc-400",
          actionButton: "group-[.toast]:bg-zinc-900 group-[.toast]:text-zinc-50 font-medium dark:group-[.toast]:bg-zinc-50 dark:group-[.toast]:text-zinc-900",
          cancelButton: "group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-500 font-medium dark:group-[.toast]:bg-zinc-800 dark:group-[.toast]:text-zinc-400"
        }
      },
      ...props
    }
  );
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, hideTitleTagSuffix, noindex } = Astro2.props;
  Astro2.url.pathname;
  const desc = "Early Days is a blog about software development, programming, and technology. We share insights, updates, and stories from the codebase.";
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>
      ${title}
      ${hideTitleTagSuffix ? "" : " | Sixteen Mile Veterinary Clinic"}
    </title><meta name="description"${addAttribute(desc, "content")}>${renderSlot($$result, $$slots["meta"])}<meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(desc, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.request.url, "content")}><meta property="og:image" content="/ogimage.jpg"><meta property="og:image:width" content="1080"><meta property="og:image:height" content="720">${noindex && renderTemplate`<meta name="robots" content="noindex,follow">`}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Toaster", Toaster, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/ui/sonner", "client:component-export": "Toaster" })} </body></html>`;
}, "/workspace/src/components/_/layout/Layout.astro", void 0);

export { $$Layout as $ };
