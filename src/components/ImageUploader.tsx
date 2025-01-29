import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "./ui/dialog";

interface ImageUploaderProps {
  imgSrc: string; // The current (DB) image URL if any
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imgSrc }) => {
  const [previewSrc, setPreviewSrc] = useState(imgSrc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /**
   * When user picks a file, we do a local preview only.
   * We do *not* upload yet.
   */
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Unsupported file type!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewSrc(base64); // local preview
    };
    reader.readAsDataURL(file);

    setSelectedFile(file); // store so we can upload later
  }

  /**
   * Handle the dialog’s own "Upload" button click/submit.
   * This is where we actually do the upload to the server or S3.
   */
  async function handleDialogSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    try {
      // For demonstration, let's do a base64 approach
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        // Example: POST to your /api/uploadProfileImage
        const response = await fetch("/api/uploadProfileImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64Image,
            mimeType: selectedFile.type,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        const finalUrl = data.newImgURL;
        if (!finalUrl) {
          throw new Error("No final URL received!");
        }

        // Update the hidden input so the main form can get the final URL
        const hiddenInput = document.getElementById(
          "profileSrc"
        ) as HTMLInputElement;
        if (hiddenInput) {
          hiddenInput.value = finalUrl;
        }

        // Update local preview if you want to reflect the new final URL
        setPreviewSrc(finalUrl);

        alert("Image uploaded successfully!");
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url(${previewSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white">Change Image</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-pink-700">
            Upload a new image
          </DialogTitle>
          {/* Optionally include <DialogClose /> to add a close button */}
        </DialogHeader>

        {/* We have a mini form inside the dialog, with its own onSubmit */}
        <form
          onSubmit={handleDialogSubmit}
          className="flex flex-col space-y-4 mt-4"
        >
          <input
            type="file"
            accept="image/png, image/webp, image/jpeg"
            onChange={handleFileSelect}
          />

          <button
            type="submit"
            className="inline-block rounded-md bg-black py-2 px-4 text-white"
          >
            Upload
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
