// LearningObjects.js
import { McForm } from "./forms/McForm";
import { Mc } from "./objects/Mc";
import { McProvider } from "./contexts/McContext";

const learningObjects = [
  {
    label: "MCQ",
    content: () => (
      <McProvider>
        <McForm />
        <br />
        <Mc />
      </McProvider>
    ),
  },
];

export default learningObjects;
