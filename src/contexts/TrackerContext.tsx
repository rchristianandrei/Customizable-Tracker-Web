import React, { createContext, useContext, useState } from "react";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";
import type { BaseComponent } from "@/types/tracker/components/BaseComponent";

type TrackerProviderProps = {
  children: React.ReactNode;
};

const TrackerContext = createContext<
  | {
      tracker: TrackerType;
      setTracker: React.Dispatch<React.SetStateAction<TrackerType>>;
      selectedComponent: BaseComponent | null;
      setSelectedComponent: React.Dispatch<
        React.SetStateAction<BaseComponent | null>
      >;
    }
  | undefined
>(undefined);

export function TrackerProvider({ children }: TrackerProviderProps) {
  const [tracker, setTracker] = useState<TrackerType>(TrackerTypeDefaultValue);
  const [selectedComponent, setSelectedComponent] =
    useState<BaseComponent | null>(null);

  return (
    <TrackerContext.Provider
      value={{ tracker, setTracker, selectedComponent, setSelectedComponent }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);

  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }

  return context;
}
