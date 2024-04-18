// LearningObjectModal.js

export default function LearningObjectModal({ onChoose, onClose, learningObjects }) {
  return (
    <div className="modal-background">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>Close</button>
        <ul>
          {learningObjects.map((obj, index) => (
            <button key={index} onClick={() => onChoose(obj.label)}>
              {obj.label}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
