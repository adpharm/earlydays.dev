import { jsxs, jsx } from 'react/jsx-runtime';
import { C as CustomButton } from './CustomButton_kgQYfk_Z.mjs';

function logOut() {
  console.log("LOGGING OUT");
  fetch("/logout", { method: "POST" }).then(() => {
    window.location.href = "/login";
  }).catch((err) => {
    console.error("Logout error:", err);
  });
}
function AdminNavigation() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center p-4 h-20 w-full bg-pink-600", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-center items-center space-x-8", children: /* @__PURE__ */ jsx("a", { href: "/admin", className: "text-xl text-white font-semibold", children: "Admin Dashboard" }) }),
    /* @__PURE__ */ jsx(CustomButton, { content: "Log out", onClick: logOut, variant: "dark" })
  ] });
}

export { AdminNavigation as A };
