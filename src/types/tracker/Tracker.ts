import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TrackerType = {
  Name: string;
  Width: number;
  Components: BaseComponent[];
};

export const TrackerTypeDefaultValue: TrackerType = {
  Name: "Tracker Name",
  Width: 598,
  Components: [],
};
