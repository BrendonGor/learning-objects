"use client";

import React from "react";
import { useMcContext } from "@/components/builder/learning-objects/contexts/McContext";

export const McForm: React.FC = () => {
  const { textFields, addTextField, updateTextField, question, setQuestion } =
    useMcContext();

  const handleFieldChange = (
    index: number,
    field: Partial<{ value: string; explanation: string; correct: boolean }>
  ) => {
    updateTextField(index, field);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />

        {textFields.map((field, index) => (
          <div key="McForm{index}">
            <input
              value={field.value}
              onChange={(e) =>
                handleFieldChange(index, { value: e.target.value })
              }
              placeholder="Value"
            />
            <input
              value={field.explanation}
              onChange={(e) =>
                handleFieldChange(index, { explanation: e.target.value })
              }
              placeholder="Explanation"
            />
            <label>
              Correct
              <input
                type="checkbox"
                checked={field.correct}
                onChange={(e) =>
                  handleFieldChange(index, { correct: e.target.checked })
                }
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addTextField}>
          Add Field
        </button>
      </form>
    </div>
  );
};
