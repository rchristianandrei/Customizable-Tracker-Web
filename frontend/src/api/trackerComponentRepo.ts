import { api } from "@/api/axios";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

const prefix = "/trackerComponent";

export const trackerComponentRepo = {
  GetAll: (trackerId: number) => {
    return api.get<BaseComponent[]>(`${prefix}/tracker/${trackerId}`);
  },
  GetById: (id: number) => {
    return api.get<BaseComponent>(`${prefix}/${id}`);
  },
  Create: (trackerId: number) => {
    return api.post<BaseComponent>(`${prefix}/textbox`, {
      trackerId: trackerId,
    });
  },
};
