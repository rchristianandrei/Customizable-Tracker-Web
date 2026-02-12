import React, { createContext, useContext, useMemo } from "react";
import { type TrackerType } from "@/types/tracker/Tracker";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import { useTracker } from "@/hooks/useTracker";
import { useComponent } from "@/hooks/useComponent";

const TrackerStateContext = createContext<
  | {
      tracker: TrackerType | null;
      selectedComponent: TrackerComponentType | null;
    }
  | undefined
>(undefined);

const TrackerActionsContext = createContext<
  | {
      setSelectedComponentId: React.Dispatch<
        React.SetStateAction<number | null>
      >;
      getTracker: (trackerId: number) => Promise<void>;
      updateTracker: (fn: (tracker: TrackerType) => TrackerType) => void;
      updateComponent: (
        fn: (comp: TrackerComponentType) => TrackerComponentType,
      ) => void;
      deleteComponent: (id: number) => void;
    }
  | undefined
>(undefined);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const { tracker, setTracker, getTracker, updateTracker } = useTracker();
  const {
    selectedComponentId,
    setSelectedComponentId,
    updateComponent,
    deleteComponent,
  } = useComponent(setTracker);

  const selectedComponent = useMemo(() => {
    if (!tracker || selectedComponentId == null) return null;
    return tracker.components.find((c) => c.id === selectedComponentId) ?? null;
  }, [tracker, selectedComponentId]);

  const stateValue = useMemo(
    () => ({
      tracker,
      selectedComponent,
    }),
    [tracker, selectedComponent],
  );

  const actionsValue = useMemo(
    () => ({
      setSelectedComponentId,
      getTracker,
      updateTracker,
      updateComponent,
      deleteComponent,
    }),
    [
      setSelectedComponentId,
      getTracker,
      updateTracker,
      updateComponent,
      deleteComponent,
    ],
  );

  return (
    <TrackerStateContext.Provider value={stateValue}>
      <TrackerActionsContext.Provider value={actionsValue}>
        {children}
      </TrackerActionsContext.Provider>
    </TrackerStateContext.Provider>
  );
}

export function useTrackerState() {
  const context = useContext(TrackerStateContext);
  if (!context) {
    throw new Error("useTrackerState must be used within TrackerProvider");
  }
  return context;
}

export function useTrackerActions() {
  const context = useContext(TrackerActionsContext);
  if (!context) {
    throw new Error("useTrackerActions must be used within TrackerProvider");
  }
  return context;
}
