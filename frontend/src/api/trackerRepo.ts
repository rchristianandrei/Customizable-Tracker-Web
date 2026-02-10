import { api } from "@/api/axios";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";

const prefix = "/tracker";

export const TrackerRepo = {
  GetAll: () => {
    return api.get<TrackerType[]>(prefix);
  },
  GetById: (id: number): TrackerType | null => {
    return TrackerTypeDefaultValue;
  },
};
