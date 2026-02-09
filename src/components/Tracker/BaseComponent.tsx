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
        width: component.Width,
        left: `${component.Left}px`,
        top: `${component.Top}px`,
      }}
    >
      <Label className="h-3.5">{component.Name}</Label>
      {children}
    </Field>
  );
}
