// Importing core components
import QuillEditor from "react-quill-new";
// Importing styles
import "@/lib/styles.modules.css";
import "react-quill-new/dist/quill.snow.css";
import { CustomButton } from "@/components/CustomButton";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { SelectPost, SelectUser } from "@/schema";

type ViewerProps = {
  content: string;
};

const Editor: React.FC<ViewerProps> = ({ content }) => {
  // Editor state

  return (
    <ReactQuill
      theme="bubble"
      value={content}
      className="text-black decoration-white bg-gray-300 w-full h-min-screen mb-6"
    />
  );
};

export default Editor;
