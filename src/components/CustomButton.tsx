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
  dark = false,
  link = true,
  onClick,
}: CustomButtonProps) {
  if (!link) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex justify-center items-center p-2 px-10 bg-yellow-medium border-8 border-yellow-bright rounded-full text-white font-bold ${
          dark ? "text-blue-background" : "text-white"
        }`}
      >
        {content}
      </button>
    );
  }
  return (
    <a href={href}>
      <div
        className={`flex justify-center items-center p-2 px-10 bg-yellow-medium border-8 border-yellow-bright rounded-full text-white font-bold ${
          dark ? "text-blue-background" : "text-white"
        }`}
      >
        {content}
      </div>
    </a>
  );
}
