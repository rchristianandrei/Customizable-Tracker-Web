import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

export type TrackerType = {
  id: number;
  name: string;
  width: number;
  components: BaseComponent[];
};

export const TrackerTypeDefaultValue: TrackerType = {
  id: 1,
  name: "Tracker Name",
  width: 598,
  components: [],
};
