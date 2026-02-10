import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TextboxType = BaseComponent & {
  type: "Textbox";
  maxLength: number;
};
