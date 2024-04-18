import React, { useState } from "react";
import { useMcContext } from "@/components/builder/learning-objects/contexts/McContext";

export const Mc: React.FC = () => {
  const { textFields, question } = useMcContext();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === null) {
      setResult("Please select an option.");
      return;
    }

    const selected = textFields[selectedOption];
    const feedback = selected.correct
      ? "Correct!"
      : "Incorrect. " + selected.explanation;
    setResult(feedback);
  };

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
    setResult(null); // Clear previous result upon selecting a new option
  };

  const handleReset = () => {
    setSelectedOption(null);
    setResult(null);
  };

  return (
    <div>
      {result === null ? (
        <div>
          <h3>{question}</h3>
          <form onSubmit={handleSubmit}>
            {textFields.map((field, index) => (
              <label
                key={`${field.value.slice(
                  0,
                  5
                )}${index}${field.explanation.slice(0, 5)}`}
              >
                <input
                  type="radio"
                  name="mcOption"
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                />
                {field.value}
              </label>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>{result}</p>
          <button onClick={handleReset}>Try Again</button>
        </div>
      )}
    </div>
  );
};
