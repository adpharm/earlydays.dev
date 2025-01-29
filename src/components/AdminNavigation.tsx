import { Menu } from "lucide-react";
import React from "react";
import { CustomButton } from "./CustomButton";

function logOut() {
  console.log("LOGGING OUT");
  fetch("/logout", { method: "POST" })
    .then(() => {
      window.location.href = "/login";
    })
    .catch((err) => {
      console.error("Logout error:", err);
    });
}

export function AdminNavigation() {
  return (
    <div className="flex flex-row justify-between items-center p-4 h-20 w-full bg-pink-600">
      <div className="flex flex-row justify-center items-center space-x-8">
        <a href="/admin" className="text-xl text-white font-semibold">
          Admin Dashboard
        </a>
      </div>

      <CustomButton content="Log out" onClick={logOut} variant="dark" />
    </div>
  );
}
