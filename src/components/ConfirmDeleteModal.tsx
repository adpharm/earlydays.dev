import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { CustomButton } from "./CustomButton";
import { deletePost } from "@/lib/utils";

interface ConfirmDeleteModalProps {
  postId: number;
}

export function ConfirmDeleteModal({ postId }: ConfirmDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await deletePost(postId);

    console.log(response);

    if ((await response.status) == 200) {
      setIsLoading(false);

      return (window.location.href = "/admin");
    } else {
      setErrorText(response.toString());
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-md border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white py-2 px-4 transition-colors text-sm">
          <p>Delete Post</p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-pink-700">
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogDescription>
            You will not be able to retrieve this post if you continue. If you
            would rather unpublish it, please do so instead.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorText != "" && (
              <p className="text-red-500 text-sm">{errorText}</p>
            )}
            <div className="w-full flex flex-row h-full items-end justify-end space-x-2">
              <DialogClose className="rounded-md bg-zinc-300 text-black hover:bg-black hover:text-white transition-colors px-4 py-2 border border-zinc-300 hover:border-black">
                <p>Cancel</p>
              </DialogClose>
              <button
                type="submit"
                className="rounded-md border border-pink-600 text-bold text-pink-600 hover:bg-pink-600 hover:text-white hover:transition-colors px-6 py-2"
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
