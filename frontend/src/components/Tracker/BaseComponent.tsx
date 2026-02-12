import type React from "react";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

type BaseComponentProps = {
  children: React.ReactNode;
  clicked?: boolean;
  component: BaseComponent;
  onClick?: () => void;
};

export function BaseComponent({
  children,
  clicked,
  component,
  onClick,
}: BaseComponentProps) {
  return (
    <Field
      className={`absolute border rounded gap-1 ${clicked ? "border-foreground" : "border-background"}`}
      onClick={onClick}
      style={{
        width: `${component.width}px`,
        left: `${component.x}px`,
        top: `${component.y}px`,
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
