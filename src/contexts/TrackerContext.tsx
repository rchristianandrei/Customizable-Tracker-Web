import React, { createContext, useContext, useState } from "react";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";

type TrackerProviderProps = {
  children: React.ReactNode;
};

const TrackerContext = createContext<
  | {
      tracker: TrackerType;
      setTracker: React.Dispatch<React.SetStateAction<TrackerType>>;
    }
  | undefined
>(undefined);

export function TrackerProvider({ children }: TrackerProviderProps) {
  const [tracker, setTracker] = useState<TrackerType>(TrackerTypeDefaultValue);

  return (
    <TrackerContext.Provider value={{ tracker, setTracker }}>
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
