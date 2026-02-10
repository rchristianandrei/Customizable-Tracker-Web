import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";

export const TrackerRepo = {
  GetAll: (): TrackerType[] => {
    return [
      TrackerTypeDefaultValue,
      TrackerTypeDefaultValue,
      TrackerTypeDefaultValue,
      TrackerTypeDefaultValue,
    ];
  },
  GetById: (id: number): TrackerType | null => {
    return TrackerTypeDefaultValue;
  },
};
