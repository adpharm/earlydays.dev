// Editor.tsx

// Importing core components
import QuillEditor from "react-quill-new";
// Importing styles
import "@/lib/styles.modules.css";
import "react-quill-new/dist/quill.snow.css";
import { CustomButton } from "@/components/CustomButton";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { SelectPost, SelectUser } from "@/schema";

type EditorProps = {
  user: SelectUser;
  post?: SelectPost;
};

const Editor: React.FC<EditorProps> = ({ user, post }) => {
  // Editor state
  const [value, setValue] = useState(post?.content || "");
  const [title, setNewTitle] = useState(post?.title || "");
  const [readTime, setReadTime] = useState(post?.readTime?.toString() || "");

  // Initialize labels as an array
  const initialLabels =
    typeof post?.tags === "string"
      ? post.tags.split(",").map((tag: string) => tag.trim())
      : post?.tags || [];
  const [labels, setLabels] = useState<string[]>(initialLabels);

  // State for new label input
  const [newLabel, setNewLabel] = useState("");

  // Success/error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Quill toolbar options
  const toolbarOptions = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

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

      setSuccessMessage("Post created successfully!");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-4xl mx-auto p-4 text-gray-800"
    >
      {/* Title Field */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2 text-left text-lg font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={title}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      </div>

      <div className="w-full flex flex-row justify-between items-start space-x-8">
        {/* Labels Field */}
        <div className="flex flex-col w-1/2">
          <label
            htmlFor="labels"
            className="mb-2 text-left text-lg font-medium"
          >
            Labels
          </label>
          <div className="flex items-center mb-2">
            <input
              id="labels"
              type="text"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 mr-2"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={handleLabelKeyDown}
              placeholder="Enter a label and press Enter or Add"
            />
            <CustomButton
              content="Add"
              onClick={handleAddLabel}
              variant="dark"
              link={false}
            />
          </div>

          {/* Display Labels as Tags */}
          <div className="flex flex-wrap gap-2">
            {labels.map((label, index) => (
              <span
                key={index}
                className="flex items-center bg-pink-600 text-white px-3 py-1 rounded-full"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleRemoveLabel(label)}
                  className="ml-2 text-white hover:text-gray-200 focus:outline-none"
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
          <label
            htmlFor="readTime"
            className="mb-2 text-left text-lg font-medium"
          >
            Read time (minutes)
          </label>
          <input
            id="readTime"
            type="number"
            min="1"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </div>
      </div>

      {/* Body Field */}
      <div className="flex flex-col">
        <label className="mb-2 text-left text-xl font-medium">Body</label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={toolbarOptions}
          className="bg-white text-gray-800 w-full h-96 mb-4"
          placeholder="Write your post content here..."
        />
      </div>

      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 text-sm">
          {successMessage} You may safely close this pop-up.
        </div>
      )}

      {/* Submit Buttons */}
      <div className="w-full flex items-center justify-end space-x-4 pt-6">
        <CustomButton content="Save Draft" variant="light" onClick={() => {}} />
        <CustomButton
          content="Save and Submit"
          variant="primary"
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default Editor;
