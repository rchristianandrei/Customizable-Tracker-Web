import { api } from "@/api/axios";

const prefix = "/trackerComponent";

export const trackerComponentRepo = {
  Delete: (id: number) => {
    return api.delete(`${prefix}/${id}`);
  },
};
