import { api } from "@/api/axios";
import { type TrackerType } from "@/types/tracker/Tracker";

const prefix = "/tracker";

export const trackerRepo = {
  GetAll: () => {
    return api.get<TrackerType[]>(prefix);
  },
  GetById: (id: number) => {
    return api.get<TrackerType>(`${prefix}/${id}`);
  },
  Create: (createData: { name: string }) => {
    return api.post<TrackerType>(prefix, {
      name: createData.name,
    });
  },
};
