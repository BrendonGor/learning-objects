'use client';

import * as React from "react";
import { motion, Reorder } from "framer-motion";
import { CloseIcon } from "@/components/Icons/CloseIcon";
import { Label } from "@/components/builder/learning-objects/interfaces";

interface Props {
  item: Label;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export const Tab = ({ item, onClick, onRemove, isSelected }: Props) => {
  return (
    <Reorder.Item
      value={item}
      id={item.label}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        backgroundColor: isSelected ? "#f3f3f3" : "#fff",
        y: 0,
        transition: { duration: 0.15 }
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: "#e3e3e3" }}
      className={isSelected ? "selected" : ""}
      onPointerDown={onClick}
    >
      <motion.span layout="position">{`${item.icon} ${item.label}`}</motion.span>
      <motion.div layout className="close">
        <motion.button
          onClick={(event) => {
            event.stopPropagation();
            onRemove(); // TODO: add alert to double check this is what they want
          }}
          initial={false}
          animate={{ backgroundColor: isSelected ? "#e3e3e3" : "#fff" }}
        >
          <CloseIcon />
        </motion.button>
      </motion.div>
    </Reorder.Item>
  );
};
