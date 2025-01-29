import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatShortDate(dt: Date | string | null | undefined): string {
  if (!dt) return "";

  let dateObj: Date;

  if (typeof dt === "string") {
    dateObj = new Date(dt);
  } else {
    dateObj = dt;
  }

  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", dt);
    return "";
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
