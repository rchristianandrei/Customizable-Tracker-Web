import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TextboxType = BaseComponent & {};

export const TextboxTypeDefaultValue: TextboxType = {
  id: 0,
  type: "TextboxType",
  name: "Textbox",
  width: 200,
  x: 20,
  y: 20,
};
