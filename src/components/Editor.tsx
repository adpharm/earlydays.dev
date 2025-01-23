// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "@/lib/styles.modules.css";
import "react-quill/dist/quill.snow.css";
import { CustomButton } from "@/components/CustomButton";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SelectPost } from "@/schema";

type EditPostModalProps = {
  post: SelectPost;
};

const Editor = (post: any) => {
  // Editor state
  const [value, setValue] = useState("");

  const toolbarOptions = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

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
    <>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-4xl">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-white mb-2 text-left text-xl">
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
        <div className="">
          <div className="flex flex-col">
            <label
              htmlFor="labels"
              className="text-white mb-2 text-left text-xl"
            >
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
        </div>

        <p className="text-white mb-2 text-left text-xl">Body</p>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="text-black decoration-white bg-gray-300 w-full"
          modules={toolbarOptions}
        />

        {errorMessage && (
          <div className="text-red-400 text-sm">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-yellow-bright text-sm">
            {successMessage} You may safely close this pop-up.
          </div>
        )}

        <div className="w-full flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="mt-4 rounded-full bg-gray-400 border-8 border-gray-400 text-blue-background font-bold px-12 py-2"
          >
            Save draft
          </button>
          <button
            type="submit"
            className="mt-4 rounded-full bg-yellow-bright border-8 border-yellow-medium text-blue-background font-bold px-12 py-2"
          >
            Save and Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Editor;
