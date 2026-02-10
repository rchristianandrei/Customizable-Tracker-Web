import type { TrackerComponentType } from "./components/TrackerComponent";

export type TrackerType = {
  id: number;
  name: string;
  width: number;
  dateTimeCreated: Date;
  components: TrackerComponentType[];
};

export const TrackerTypeDefaultValue: TrackerType = {
  id: 1,
  name: "Tracker Name",
  width: 598,
  dateTimeCreated: new Date(),
  components: [],
};
