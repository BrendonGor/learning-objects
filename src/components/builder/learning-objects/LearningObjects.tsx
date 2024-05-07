// LearningObjects.js
import { McForm } from "./forms/McForm";
import { Mc } from "./objects/Mc";
import { McProvider } from "./contexts/McContext";

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
    content: () => <div>Text Editor</div>,
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
