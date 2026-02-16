import React, { createContext, useContext, useMemo, useState } from "react";
import { type TrackerType } from "@/types/tracker/Tracker";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import { useTracker } from "@/hooks/useTracker";
import { useComponent } from "@/hooks/useComponent";

const EditTrackerStateContext = createContext<
  | {
      tracker: TrackerType | null;
      selectedComponent: TrackerComponentType | null;
    }
  | undefined
>(undefined);

const EditTrackerActionsContext = createContext<
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

export function EditTrackerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <EditTrackerStateContext.Provider value={stateValue}>
      <EditTrackerActionsContext.Provider value={actionsValue}>
        {children}
      </EditTrackerActionsContext.Provider>
    </EditTrackerStateContext.Provider>
  );
}

export function useEditTrackerState() {
  const context = useContext(EditTrackerStateContext);
  if (!context) {
    throw new Error(
      "useEditTrackerState must be used within EditTrackerProvider",
    );
  }
  return context;
}

export function useEditTrackerActions() {
  const context = useContext(EditTrackerActionsContext);
  if (!context) {
    throw new Error(
      "useEditTrackerActions must be used within EditTrackerProvider",
    );
  }
  return context;
}
