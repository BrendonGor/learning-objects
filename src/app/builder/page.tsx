"use client";

import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { Tab } from "@/components/builder/framer-tabs/Tab";
import { AddIcon } from "@/components/Icons/AddIcon";
import { useLearningObjects } from "@/components/builder/LearningObjectsContext";

export default function App() {
  const { tabs, selectedTab, setTabs, setSelectedTab, add, remove } =
    useLearningObjects();

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
              tabs.map((item) => (
                <Tab
                  key={item.label}
                  item={item}
                  isSelected={selectedTab === item}
                  onClick={() => {
                    setSelectedTab(item);
                    document
                      .getElementById(`section-${item.label}`) // may return null
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
          onClick={add}
          // disabled={tabs.length === allIngredients.length}
          whileTap={{ scale: 0.9 }}
        >
          <AddIcon />
        </motion.button>
      </nav>
      <div className="window">
        <main>
          {tabs.map((item) => (
            <div
              id={`section-${item.label}`} // Unique ID corresponding to the tab
              key={item.label}
              className="content-section"
            >
              {Array.from({ length: 3 }).map((_, j) => (
                <p key={j}>{item.label}</p>
              ))}
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
