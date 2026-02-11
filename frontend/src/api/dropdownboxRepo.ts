import { api } from "@/api/axios";
import type { DropdownboxType } from "@/types/tracker/components/Dropdownbox";

const prefix = "/dropdownbox";

export const dropdownboxRepo = {
  Create: (trackerId: number) => {
    return api.post<DropdownboxType>(`${prefix}/dropdownbox`, {
      trackerId: trackerId,
    });
  },
  Update: (component: DropdownboxType) => {
    return api.put(`${prefix}/${component.id}`, component);
  },
};
