import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";

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
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to change password");
      }

      // if successful
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
      <DialogTrigger className="rounded-full bg-yellow-bright border-8 border-yellow-medium text-blue-background px-4 py-2 font-bold">
        Change Password
      </DialogTrigger>
      <DialogContent className="border-8 border-yellow-bright bg-blue-background">
        <DialogHeader>
          <DialogTitle className="font-bold text-white">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-white mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-white mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <div className="text-red-400 text-sm">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-yellow-bright text-sm">
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
