// LearningObjects.js
import { McForm } from "./forms/McForm";
import { Mc } from "./objects/Mc";
import { McProvider } from "./contexts/McContext";
import { EditorForm } from "./forms/EditorForm";
import { Editor } from "./objects/Editor";
import { EditorProvider } from "./contexts/EditorContext";

export const learningObjects = [
  {
    learningObjectType: "MCQ",
    icon: "❔",
    content: (showForm: boolean) => (
      <McProvider>{showForm ? <McForm /> : <Mc />}</McProvider>
    ),
  },
  {
    learningObjectType: "Text Editor",
    icon: "🖺",
    content: (showForm: boolean) => (
      <EditorProvider>{showForm ? <EditorForm /> : <Editor />}</EditorProvider>
    ),
  },
];

export function getLearningObjectContent(
  learningObjectType: string,
  showForm: boolean
): JSX.Element | null {
  // Find the learning object by type
  const learningObject = learningObjects.find(
    (obj) => obj.learningObjectType === learningObjectType
  );
  // Check if the learning object exists and has a content function, then call it
  return learningObject ? learningObject.content(showForm) : null;
}
