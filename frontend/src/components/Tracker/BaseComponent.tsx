import type React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";
import { useTrackerComponent } from "@/contexts/TrackerContext";
import { useMemo } from "react";

type BaseComponentProps = {
  children: React.ReactNode;
  component: BaseComponent;
};

export function BaseComponent({ children, component }: BaseComponentProps) {
  const { isClicked: selectedComponentId } = useTrackerComponent();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
  });

  const clicked = useMemo(
    () => selectedComponentId === component.id,
    [selectedComponentId],
  );

  return (
    <Field
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute border rounded gap-1 ${clicked ? "border-foreground" : "border-background"}`}
      style={{
        width: `${component.width}px`,
        left: `${component.x}px`,
        top: `${component.y}px`,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div className="flex items-center justify-between">
        <Label className="h-3.5">{component.name}</Label>
        <span className="text-red-700">*</span>
      </div>
      {children}
    </Field>
  );
}
