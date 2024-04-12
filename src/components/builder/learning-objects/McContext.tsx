// DynamicFormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TextField {
  value: string;
  explanation: string;
  correct: boolean;
}

interface McContextType {
  textFields: TextField[];
  addTextField: () => void;
  updateTextField: (index: number, field: Partial<TextField>) => void;
  // Define the structure for your MC question state here, including methods to update it and check answers
}

const McContext = createContext<McContextType | undefined>(undefined);

export const McProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [textFields, setTextFields] = useState<TextField[]>([
    { value: "", explanation: "", correct: false },
  ]);

  const addTextField = () => {
    setTextFields([
      ...textFields,
      { value: "", explanation: "", correct: false },
    ]);
  };

  const updateTextField = (index: number, field: Partial<TextField>) => {
    const updatedFields = [...textFields];
    updatedFields[index] = { ...updatedFields[index], ...field }; // new properties will overwrite old ones
    setTextFields(updatedFields);
  };

  // Implement logic for MC question state management here

  return (
    <McContext.Provider value={{ textFields, addTextField, updateTextField }}>
      {children}
    </McContext.Provider>
  );
};

export const useMcContext = () => {
  const context = useContext(McContext);
  if (context === undefined) {
    throw new Error("useDynamicForm must be used within a DynamicFormProvider");
  }
  return context;
};
