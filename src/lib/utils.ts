import { SelectPost } from "@/schema";
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

export async function createNewDraft() {
  // we need to call fetch to create a new draft post
  const response = await fetch("/api/insertPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(""),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to create draft");
  }

  return response.json();
}

export async function publishPost(post: SelectPost) {
  // publish the post
  const response = await fetch("/api/publishPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

export async function deletePost(postId: number) {
  console.log("POST ID: ", postId);
  // delete the post
  const response = await fetch("/api/deletePost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  });

  return response;
}
