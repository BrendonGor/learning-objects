"use client";

import "./styles.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { Tab } from "@/components/builder/framer-tabs/Tab";
import { AddIcon } from "@/components/Icons/AddIcon";
import { useLearningObjects } from "@/components/builder/LearningObjectsContext";

import { McProvider } from "@/components/builder/learning-objects/contexts/McContext";
import { Mc } from "@/components/builder/learning-objects/objects/Mc";
import { McForm } from "@/components/builder/learning-objects/forms/McForm";
import {
  learningObjects,
  getLearningObjectContent,
} from "@/components/builder/learning-objects/LearningObjects";
import LearningObjectModal from "@/app/builder/components/LearningObjectModal";
import { Label } from "@/components/builder/learning-objects/interfaces";

export default function App() {
  // tabs are the labels of the learning objects
  const { tabs, selectedTab, setTabs, setSelectedTab, add, remove } =
    useLearningObjects();
  // State to control visibility of modal, true shows modal, false hides it
  const [showModal, setShowModal] = useState(false);
  // State to control visibility/render. Exp: true shows McForm, false shows Mc question
  const [showForm, setShowForm] = useState(true);
  // Correct usage with useEffect to ensure it only runs once on component mount
  useEffect(() => {
    // Add starting text editor. The first in the learningObjects list
    add({
      icon: learningObjects[0].icon,
      learningObjectType: learningObjects[0].learningObjectType,
      key: uuidv4(),
    });
  }, []);

  return (
    <div>
      <nav>
        <Reorder.Group
          as="ul"
          axis="x"
          onReorder={setTabs}
          className="tabs"
          values={tabs}
        >
          <AnimatePresence initial={false}>
            {
              // map each item in the list to a Tab component. key, item standard. isSelected tells tab if selected (effects styling).
              tabs.map((item, index) => (
                <Tab
                  key={item.key}
                  item={item}
                  isSelected={selectedTab === item}
                  onClick={() => {
                    setSelectedTab(item);
                    document
                      .getElementById(`section-${index}`) // may return null
                      ?.scrollIntoView({
                        behavior: "smooth", // Smooth scroll
                      });
                  }}
                  onRemove={() => remove(item)}
                />
              ))
            }
          </AnimatePresence>
        </Reorder.Group>
        <motion.button
          className="add-item"
          onClick={() => setShowModal(true)}
          whileTap={{ scale: 0.9 }}
        >
          <AddIcon />
        </motion.button>
      </nav>

      {
        // if showModal is true, render LearningObjectModal
        showModal && (
          <LearningObjectModal
            onChoose={(icon: string, learningObjectType: string) => {
              add({
                icon: icon,
                learningObjectType: learningObjectType,
                key: uuidv4(),
              });
              setShowModal(false);
            }}
            onClose={() => setShowModal(false)}
            learningObjects={learningObjects}
          />
        )
      }

      <div className="window">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              padding: "5px 10px", // Added for better button sizing
            }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Render" : "Modify"}
          </button>
        </div>

        <main>
          {tabs.map((item) => (
            <div
              key={`section-${item.key}`} // Unique ID corresponding to the tab
              className="content-section"
            >
              {getLearningObjectContent(item.learningObjectType, showForm)}
              {/* <McProvider>
                {showForm ? <McForm /> : <Mc />}
              </McProvider> */}
              <br></br>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

{
  /* <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab ? selectedTab.icon : "😋"}
          </motion.div>
        </AnimatePresence> */
}
