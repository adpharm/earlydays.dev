import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { CustomButton } from "./CustomButton";

export function ChangePasswordModal() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to change password");
      }

      setSuccessMessage("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-lg border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white w-52 py-2 px-4 transition-colors">
          <p>Change Password</p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-pink-700">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="border border-gray-300 p-2 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="border border-gray-300 p-2 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-pink-600 text-sm">
                {successMessage} You may safely close this pop-up.
              </div>
            )}

            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 rounded-full bg-yellow-bright border-8 border-yellow-medium text-blue-background font-bold px-12 py-2"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
