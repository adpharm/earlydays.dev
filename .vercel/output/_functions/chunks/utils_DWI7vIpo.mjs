import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatShortDate(dt) {
  if (!dt) return "";
  let dateObj;
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
    day: "numeric"
  });
}
async function deletePost(postId) {
  console.log("POST ID: ", postId);
  const response = await fetch("/api/deletePost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId })
  });
  return response;
}

export { cn as c, deletePost as d, formatShortDate as f };
