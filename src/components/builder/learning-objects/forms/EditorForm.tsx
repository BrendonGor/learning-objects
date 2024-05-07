import React from "react";
import { useEditorContext } from "@/components/builder/learning-objects/contexts/EditorContext";
import { useEditor, EditorContent, Editor } from "@tiptap/react";

export const EditorForm = () => {
  const { editor } = useEditorContext();

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return <EditorContent editor={editor} />;
};
