// Importing core components
// Importing styles
import "@/lib/styles.modules.css";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

type ViewerProps = {
  content: string;
};

const Editor = ({ content }: ViewerProps) => {
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
