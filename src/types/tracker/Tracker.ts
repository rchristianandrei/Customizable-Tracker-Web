import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TrackerType = {
  Name: string;
  Components: BaseComponent[];
};

export const TrackerTypeDefaultValue = {
  Name: "Tracker Name",
  Components: [],
};
