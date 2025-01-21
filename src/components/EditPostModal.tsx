import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { postsTable } from "@/schema";
import { SelectPost } from "@/schema";

type EditPostModalProps = {
  post: SelectPost;
};

export function EditPostModal({ post }: { post: SelectPost }) {
  const [title, setNewTitle] = useState(post.title);
  const [readTime, setReadTime] = useState(post.readTime?.toString());
  const [labels, setLabels] = useState(post.tags);
  const [author, setAuthor] = useState(post.author);
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
        Edit Post
      </DialogTrigger>
      <DialogContent className="border-8 border-yellow-bright bg-blue-background">
        <DialogHeader>
          <DialogTitle className="font-bold text-white">Edit Post</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-white mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="readTime" className="text-white mb-2">
                Read time
              </label>
              <div className="flex flex-row justify-center items-center">
                <input
                  id="readTime"
                  type="number"
                  className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                  value={readTime ?? 0}
                  onChange={(e) => setReadTime(e.target.value)}
                />
                <p className="text-yellow-bright">mins</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="labels" className="text-white mb-2">
                Labels (separated by comma)
              </label>
              <input
                id="labels"
                type="text"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={labels ?? ""}
                onChange={(e) => setLabels(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="author" className="text-white mb-2">
                Author
              </label>
              <input
                id="author"
                type="author"
                className="border border-blue-foreground text-white bg-blue-background p-2 rounded-xl"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
