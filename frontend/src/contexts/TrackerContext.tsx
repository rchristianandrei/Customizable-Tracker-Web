import React, { createContext, useContext, useState } from "react";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import { trackerRepo } from "@/api/trackerRepo";

type TrackerProviderProps = {
  children: React.ReactNode;
};

const TrackerContext = createContext<
  | {
      tracker: TrackerType | null;
      setTracker: React.Dispatch<React.SetStateAction<TrackerType | null>>;
      selectedComponent: TrackerComponentType | null;
      setSelectedComponent: React.Dispatch<
        React.SetStateAction<TrackerComponentType | null>
      >;
      onLoad: (trackerId: number) => Promise<void>;
    }
  | undefined
>(undefined);

export function TrackerProvider({ children }: TrackerProviderProps) {
  const [tracker, setTracker] = useState<TrackerType | null>(
    TrackerTypeDefaultValue,
  );
  const [selectedComponent, setSelectedComponent] =
    useState<TrackerComponentType | null>(null);

  async function onLoad(trackerId: number) {
    try {
      const result = await trackerRepo.GetById(trackerId);
      setTracker(result.data);
    } catch (err) {
      setTracker(null);
    }
  }

  return (
    <TrackerContext.Provider
      value={{
        tracker,
        setTracker,
        selectedComponent,
        setSelectedComponent,
        onLoad,
      }}
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
