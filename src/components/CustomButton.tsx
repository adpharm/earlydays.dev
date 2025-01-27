// CustomButton.tsx
import React from "react";

type CustomButtonProps = {
  content: string;
  href?: string;
  dark?: boolean;
  link?: boolean;
  onClick?: () => void;
};

export function CustomButton({
  content,
  href,
  dark,
  link,
  onClick,
}: CustomButtonProps) {
  if (!link) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex justify-center items-center p-2 px-10 rounded-lg font-bold ${
          dark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {content}
      </button>
    );
  }
  return (
    <a
      href={href}
      className={`flex justify-center items-center p-2 px-10 rounded-lg font-bold ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div>{content}</div>
    </a>
  );
}
