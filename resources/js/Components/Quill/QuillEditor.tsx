// components/QuillEditor.tsx
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

const QuillEditor: React.FC<Props> = ({ value, onChange, className, placeholder }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: placeholder || "Enter content here ...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"] // You can add 'image', 'video' here if needed
          ]
        }
      });

      // Initial content
      quillRef.current.root.innerHTML = value || "";

      // Handle content changes
      quillRef.current.on("text-change", () => {
        const html = quillRef.current!.root.innerHTML;
        onChange(html);
      });
    }
  }, []);

  // Sync external value changes
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div className={className} ref={editorRef} style={{ minHeight: "200px" }} />;
};

export default QuillEditor;
