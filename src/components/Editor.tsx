// Editor.tsx

// Importing core components
import QuillEditor from "react-quill-new";
// Importing styles
import "@/lib/styles.modules.css";
import "react-quill-new/dist/quill.snow.css";
import { CustomButton } from "@/components/CustomButton";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import { SelectPost, SelectUser } from "@/schema";
import { Check, LoaderCircle, X } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { publishPost } from "@/lib/utils";

type EditorProps = {
  user: SelectUser;
  post?: SelectPost;
};

const Editor: React.FC<EditorProps> = ({ user, post }) => {
  // Editor state
  const [value, setValue] = useState(post?.content || "");
  const [title, setNewTitle] = useState(post?.title || "");
  const [readTime, setReadTime] = useState(post?.readTime?.toString() || "");

  // keep track of if the post is saved or not
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  // debounced changes
  const debouncedChanges = useDebounce(value, 1000);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const valueChange = async () => {
      if (debouncedChanges && debouncedChanges !== post?.content) {
        setIsSaving(true);
        setIsSaved(false);
        setChangesMade(true);
        // build payload
        const payload = {
          id: post?.id,
          title: title || "",
          content: debouncedChanges,
          readTime: readTime || 0,
          tags: labels.length > 0 ? labels.join(",") : "",
          isPublished: false,
          status: "draft",
        };

        console.log("SENDING PAYLOAD: ", payload);

        const response = await fetch("/api/updatePost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload }),
        });

        if (!response.ok) {
          setHasFailed(true);
        } else {
          setIsSaved(true);
        }
        setChangesMade(false);
        setIsSaving(false);
      }
    };

    valueChange();
  }, [debouncedChanges]);

  // Initialize labels as an array
  const initialLabels =
    typeof post?.tags === "string" && post?.tags.length > 0
      ? post.tags.split(",").map((tag: string) => tag.trim())
      : [];
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

    if (post) {
      publishPost(post);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-4xl mx-auto text-gray-800"
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
        <div className="flex flex-row justify-between items-center">
          <label className="mb-2 text-left text-xl font-medium">Body</label>
          {isSaved && (
            <div className="flex flex-row justify-end items-center w-full">
              <span className="text-xs text-slate-700">Changes saved</span>
              <Check size={16} className="ml-2 text-green-600" />
            </div>
          )}
          {isSaving && changesMade && (
            <div className="flex flex-row justify-end items-center w-full">
              <span className="text-xs text-slate-700">Saving...</span>
              <LoaderCircle className="animate-spin w-4 h-4 text-pink-600" />
            </div>
          )}
          {!isSaved && !changesMade && (
            <span className="text-xs text-slate-700">No changes made</span>
          )}
        </div>
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
      <div className="w-full flex items-center justify-end space-x-4 pt-10">
        <CustomButton content="Save Draft" variant="light" onClick={() => {}} />
        <CustomButton content="Publish" variant="primary" onClick={() => {}} />
      </div>
    </form>
  );
};

export default Editor;
