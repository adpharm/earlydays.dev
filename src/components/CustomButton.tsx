import React from "react";

type ButtonVariant = "primary" | "dark" | "outline" | "light";

type CustomButtonProps = {
  content: string;
  href?: string;
  link?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
};

export function CustomButton({
  content,
  href,
  link = false,
  onClick,
  variant = "primary",
}: CustomButtonProps) {
  // Map variant -> Tailwind classes
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 rounded font-semibold transition-colors";

  const variantClasses = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    outline:
      "border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white",
    light: "bg-white text-gray-800 hover:bg-gray-100",
  }[variant];

  // If it's a link, render an anchor
  if (link && href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </a>
    );
  }

  // Otherwise, render a button
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}
