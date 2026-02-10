import { api } from "@/api/axios";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";
import { Component } from "lucide-react";

const prefix = "/trackerComponent";

export const trackerComponentRepo = {
  GetAll: (trackerId: number) => {
    return api.get<BaseComponent[]>(`${prefix}/tracker/${trackerId}`);
  },
  GetById: (id: number) => {
    return api.get<BaseComponent>(`${prefix}/${id}`);
  },
  CreateTextbox: (trackerId: number) => {
    return api.post<BaseComponent>(`${prefix}/textbox`, {
      trackerId: trackerId,
    });
  },
  CreateDropdownbox: (trackerId: number) => {
    return api.post<BaseComponent>(`${prefix}/dropdownbox`, {
      trackerId: trackerId,
    });
  },
  Update: (component: BaseComponent) => {
    switch (component.type) {
      case "Textbox":
        return api.put(`${prefix}/textbox/${component.id}`, component);
      case "Dropdownbox":
        return api.put(`${prefix}/dropdownbox/${component.id}`, component);
    }

    throw new Error("Invalid Component Type");
  },
};
