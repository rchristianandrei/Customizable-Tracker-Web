import { api } from "@/api/axios";
import type { TextboxType } from "@/types/tracker/components/Textbox";

const prefix = "/textbox";

export const textboxRepo = {
  Create: (trackerId: number) => {
    return api.post<TextboxType>(`${prefix}`, {
      trackerId: trackerId,
    });
  },
  Update: (component: TextboxType) => {
    return api.put(`${prefix}/${component.id}`, component);
  },
};
