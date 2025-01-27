import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "@/db";
import { postsTable, SelectPost } from "@/schema";
import { eq } from "drizzle-orm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatShortDate(dt: Date | null | undefined): string {
  if (!dt) return "";
  // Example: "Oct 5, 2023"
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function getPostById(postId: number) {
  const post = (
    await db.select().from(postsTable).where(eq(postsTable.id, postId))
  ).at(0);

  return post;
}
