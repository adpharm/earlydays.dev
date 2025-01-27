// Importing core components
import QuillEditor from "react-quill-new";
// Importing styles
import "@/lib/styles.modules.css";
import "react-quill-new/dist/quill.snow.css";
import { CustomButton } from "@/components/CustomButton";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { SelectPost } from "@/schema";

type EditPostModalProps = {
  post: SelectPost;
};

const Editor = (post: any) => {
  // Editor state
  const [value, setValue] = useState(post.body || ""); // Assuming 'post.body' contains the body content
  const toolbarOptions = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const [title, setNewTitle] = useState(post.title || "");
  const [readTime, setReadTime] = useState(post.readTime?.toString() || "");
  // Initialize labels as an array. If 'post.tags' is a string, split it by commas.
  const initialLabels =
    typeof post.tags === "string"
      ? post.tags.split(",").map((tag: string) => tag.trim())
      : post.tags || [];
  const [labels, setLabels] = useState<string[]>(initialLabels);
  const [author, setAuthor] = useState(post.author || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State for new label input
  const [newLabel, setNewLabel] = useState("");

  // Handler to add a new label
  const handleAddLabel = () => {
    const trimmedLabel = newLabel.trim();
    if (trimmedLabel && !labels.includes(trimmedLabel)) {
      setLabels([...labels, trimmedLabel]);
      setNewLabel("");
    }
  };

  // Handler to remove a label
  const handleRemoveLabel = (labelToRemove: string) => {
    setLabels(labels.filter((label) => label !== labelToRemove));
  };

  // Handler for Enter key press in the label input
  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLabel();
    }
  };

  // Form submission handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      title,
      content: value,
      tags: labels.join(","),
      readTime: readTime ? Number(readTime) : undefined,
    };

    try {
      const response = await fetch("/api/insertPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Request failed");
      }

      const { insertedPost } = await response.json();
      setSuccessMessage("Post created successfully!");
      // Do something with insertedPost if necessary
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-4xl mx-auto p-4 text-black"
    >
      {/* Title Field */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2 text-left text-lg">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      </div>

      <div className="w-full flex flex-row justify-between items-start space-x-8">
        {/* Labels Field */}
        <div className="flex flex-col w-1/2">
          <label htmlFor="labels" className="mb-2 text-left text-lg">
            Labels
          </label>
          <div className="flex items-center mb-2">
            <input
              id="labels"
              type="text"
              className="flex-1 border border-gray-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={handleLabelKeyDown}
              placeholder="Enter a label and press Enter or Add"
            />
            <button
              type="button"
              onClick={handleAddLabel}
              className="ml-2 px-4 py-2 bg-black rounded-lg hover:bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          {/* Display Labels as Tags */}
          <div className="flex flex-wrap gap-2">
            {labels.map((label, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-700  px-3 py-1 rounded-full"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleRemoveLabel(label)}
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Remove label ${label}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Read Time Field */}
        <div className="flex flex-col w-48">
          <label htmlFor="readTime" className="mb-2 text-left text-lg">
            Read time (minutes){" "}
          </label>
          <input
            id="readTime"
            type="number"
            min="1"
            className="border border-gray-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </div>
      </div>

      {/* TODO:: Update this to only render if we are editing an existing post */}
      {/* Author Field
      <div className="flex flex-col">
        <label htmlFor="author" className=" mb-2 text-left text-xl">
          Author
        </label>
        <input
          id="author"
          type="text"
          className="border border-gray-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div> */}

      {/* Body Field */}
      <div className="flex flex-col mb-6">
        <label className=" mb-2 text-left text-xl">Body</label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="text-black decoration-white bg-gray-300 w-full h-96 mb-6"
          modules={toolbarOptions}
          placeholder="Write your post content here..."
        />
      </div>

      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="text-red-400 text-sm">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-400 text-sm">
          {successMessage} You may safely close this pop-up.
        </div>
      )}

      {/* Submit Buttons */}
      <div className="w-full flex items-center justify-end space-x-4">
        <button
          type="submit"
          className="mt-4 rounded-lg bg-gray-400 text-black font-bold px-6 py-2 hover:bg-gray-800"
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-black text-white font-bold px-6 py-2 hover:bg-gray-800"
        >
          Save and Submit
        </button>
      </div>
    </form>
  );
};

export default Editor;
