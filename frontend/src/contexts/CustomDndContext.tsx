import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import type React from "react";
import { createContext, useContext, useState } from "react";

const CustomDndContext = createContext<
  | {
      onDragEnd: {
        id: number;
        x: number;
        y: number;
      };
      onDragStart: {
        id: number;
      };
    }
  | undefined
>(undefined);

export const CustomDndProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onDragEnd, setOnDragEnd] = useState({ id: 0, x: 0, y: 0 });
  const [onDragStart, setOnDragStart] = useState({ id: 0 });

  return (
    <CustomDndContext.Provider value={{ onDragStart, onDragEnd }}>
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragStart={(event) => {
          const { active } = event;
          setOnDragStart({ id: Number(active.id) });
        }}
        onDragEnd={(event) => {
          const { delta, active } = event;
          setOnDragEnd({ id: Number(active.id), x: delta.x, y: delta.y });
        }}
      >
        {children}
      </DndContext>
    </CustomDndContext.Provider>
  );
};

export function useCustomDnd() {
  const context = useContext(CustomDndContext);
  if (!context) {
    throw new Error(
      "useCustomDndContext must be used within CustomDndProvider",
    );
  }
  return context;
}
