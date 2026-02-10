import type { BaseComponent } from "./BaseComponent";

export type DropdownboxType = BaseComponent & {
  type: "Dropdownbox";
  maxCount: number;
};
