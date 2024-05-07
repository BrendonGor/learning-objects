import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// defines the state is a tiptap editor
export type EditorContextType = {
  editor: Editor | null;
};

const EditorContext = createContext<EditorContextType>({ editor: null });
// this typing equivalent to typing in MCContext
export const EditorProvider = ({ children }: { children: ReactNode }) => {
  // create the editor. Set the extensions and initial content
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });
  // effect destroys the editor when the component is unmounted
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    // value requires object
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
