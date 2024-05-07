import { Label } from "@/components/builder/learning-objects/interfaces";

// interface LearningObjectModalProps {
//   onChoose: (LearningObjectType: string) => void;
//   onClose: () => void;
//   learningObjects: Label[];
// }
/**
 * Displays the learning objects users may add to their learning resource. A user can add one or zero learning objects.
 * @param {*} param0 takes in the learning objects availabe to the user,
 *  the function to call when a user chooses a learning object (generally adds it to the learning resource),
 *  and the function to call when the user closes the modal (this generally hides the modal)
 * @returns
 */
export default function LearningObjectModal({
  onChoose,
  onClose,
  learningObjects,
}) {
  return (
    <div className="modal-background">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <ul>
          {learningObjects.map((obj, index) => (
            <button onClick={() => onChoose(obj.icon, obj.learningObjectType)}>
              {obj.learningObjectType}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
