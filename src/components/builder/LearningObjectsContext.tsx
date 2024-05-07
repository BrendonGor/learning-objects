"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Label } from "@/components/builder/learning-objects/interfaces";
import { removeItem, closestItem } from "@/lib-utils/array-utils";

// type for the state of the context
interface LearningObjectsContextType {
  tabs: Label[];
  selectedTab: Label;
  setTabs: Dispatch<SetStateAction<Label[]>>; // Added setter for tabs
  setSelectedTab: Dispatch<SetStateAction<Label>>; // Added setter for selectedTab
  add: (label: Label) => void;
  remove: (item: Label) => void;
}
// create context
const LearningObjectsContext = createContext<
  LearningObjectsContextType | undefined
>(undefined);

export const LearningObjectsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // initial list has rich text box (generally for title)
  const [tabs, setTabs] = useState<Label[]>([]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]); // use item rather than index because don't have to deal with index changes

  const remove = (item: Label) => {
    // if the item being deleted is the one currently selected then select its neighbor prior to deleting it
    if (item === selectedTab) {
      setSelectedTab(closestItem(tabs, item));
    }
    // remove item from state list and update state
    setTabs(removeItem(tabs, item));
  };

  const add = (label: Label) => {
    // add item to state list and update state
    setTabs([...tabs, label]);
    setSelectedTab(label);
  };

  // state and methods to be exposed to children
  const value: LearningObjectsContextType = {
    tabs,
    selectedTab,
    setTabs, // Exposing setTabs
    setSelectedTab, // Exposing setSelectedTab
    add,
    remove,
  };

  return (
    <LearningObjectsContext.Provider value={value}>
      {children}
    </LearningObjectsContext.Provider>
  );
};

// hook
export const useLearningObjects = (): LearningObjectsContextType => {
  const context = useContext(LearningObjectsContext);
  if (!context) {
    throw new Error(
      "useLearningObjects must be used within a LearningObjectsProvider"
    );
  }
  return context;
};

// using useReducer to manage array state example

// import React, { createContext, useContext, useReducer } from 'react';

// const ArrayContext = createContext();

// // Action types
// const ActionTypes = {
//   ADD_ITEM: 'ADD_ITEM',
//   DELETE_ITEM: 'DELETE_ITEM',
//   MOVE_ITEM: 'MOVE_ITEM',
// };

// // Reducer function
// const arrayReducer = (state, action) => {
//   switch (action.type) {
//     case ActionTypes.ADD_ITEM:
//       const newItem = `Item ${state.length + 1}`;
//       return [...state, newItem];
//     case ActionTypes.DELETE_ITEM:
//       return state.filter((_, index) => index !== action.payload.index);
//     case ActionTypes.MOVE_ITEM:
//       const { from, to } = action.payload;
//       const newState = Array.from(state);
//       const [removedItem] = newState.splice(from, 1);
//       newState.splice(to, 0, removedItem);
//       return newState;
//     default:
//       return state;
//   }
// };

// export const useArray = () => useContext(ArrayContext);

// export const LearningObjectContext = ({ children }) => {
//   const [array, dispatch] = useReducer(arrayReducer, ['Item 1', 'Item 2', 'Item 3']);

//   const addItem = () => dispatch({ type: ActionTypes.ADD_ITEM });
//   const deleteItem = (index) => dispatch({ type: ActionTypes.DELETE_ITEM, payload: { index } });
//   const moveItem = (from, to) => dispatch({ type: ActionTypes.MOVE_ITEM, payload: { from, to } });

//   return (
//     <ArrayContext.Provider value={{ array, addItem, deleteItem, moveItem }}>
//       {children}
//     </ArrayContext.Provider>
//   );
// };
