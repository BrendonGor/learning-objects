"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEditorContext } from "@/components/builder/learning-objects/contexts/EditorContext";

export const Editor = () => {
  const { editor } = useEditorContext();
  editor?.setEditable(false); // Disable editing
  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return <EditorContent editor={editor} />;
};

// export const Editor: React.FC = () => {
//   const { editor } = useEditorContext();

//   return <div>{editor?.getHTML()}</div>; // This method converts the document to HTML
// };
