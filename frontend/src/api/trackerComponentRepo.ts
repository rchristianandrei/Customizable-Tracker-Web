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
    return api.put(`${prefix}/${component.id}`, component);
  },
};
