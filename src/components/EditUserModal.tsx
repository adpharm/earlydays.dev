import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { SelectUser } from "@/schema";

type EditUserModal = {
  user: SelectUser;
};

export function EditUserModal(user: SelectUser) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gitUrl, setGitUrl] = useState(user.gitUrl);
  const [profileSrc, setProfileSrc] = useState(user.profileSrc);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-yellow-bright border-8 border-yellow-medium text-blue-background px-4 py-2 font-bold">
        Edit User
      </DialogTrigger>
      <DialogContent className="border-8 border-yellow-bright bg-blue-background">
        <DialogHeader>
          <DialogTitle className="font-bold text-white">Edit User</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-white mb-2">
                Email
              </label>
              <div className="flex flex-row justify-center items-center">
                <input
                  id="email"
                  type="email"
                  className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-yellow-bright">mins</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="gitUrl" className="text-white mb-2">
                Github URL
              </label>
              <input
                id="gitUrl"
                type="text"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={gitUrl ?? ""}
                onChange={(e) => setGitUrl(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="profileSrc" className="text-white mb-2">
                Profile Picture URL
              </label>
              <input
                id="profileSrc"
                type="text"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={profileSrc ?? ""}
                onChange={(e) => setProfileSrc(e.target.value)}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
