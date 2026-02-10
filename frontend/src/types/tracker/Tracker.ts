import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TrackerType = {
  Id: number;
  Name: string;
  Width: number;
  Components: BaseComponent[];
};

export const TrackerTypeDefaultValue: TrackerType = {
  Id: 1,
  Name: "Tracker Name",
  Width: 598,
  Components: [],
};
