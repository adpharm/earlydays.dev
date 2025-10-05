import { jsx } from 'react/jsx-runtime';

function CustomButton({
  content,
  href,
  link = false,
  onClick,
  variant = "primary"
}) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded font-semibold transition-colors";
  const variantClasses = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white",
    light: "bg-white text-gray-800 hover:bg-gray-100"
  }[variant];
  if (link && href) {
    return /* @__PURE__ */ jsx("a", { href, className: `${baseClasses} ${variantClasses}`, children: content });
  }
  return /* @__PURE__ */ jsx("button", { onClick, className: `${baseClasses} ${variantClasses}`, children: content });
}

export { CustomButton as C };
