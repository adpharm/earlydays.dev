import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import React from "react";
import { CustomButton } from "./CustomButton";

// A client-side logout approach, calling a /logout endpoint
function logOut() {
  console.log("LOGGING OUT");
  fetch("/logout", { method: "POST" })
    .then(() => {
      // After server handles session cleanup, redirect to login
      window.location.href = "/login";
    })
    .catch((err) => {
      console.error("Logout error:", err);
      // Optionally, show an error message or fallback
    });
}

export function AdminNavigation() {
  return (
    <div className="flex flex-row justify-between items-center p-4 h-20 w-full bg-black px-10">
      <div className="flex flex-row justify-center items-center space-x-8">
        <a href="/admin" className="text-xl text-white min-w-64">
          Admin Dashboard
        </a>
      </div>
      {/* 
        Instead of using href, we pass an onClick handler to trigger logout.
        We also set link={false} so CustomButton doesn't render an <a> tag.
      */}
      <CustomButton content="Log out" onClick={logOut} link={false} />
    </div>
  );
}
