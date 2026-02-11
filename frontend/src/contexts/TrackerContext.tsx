import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  TrackerTypeDefaultValue,
  type TrackerType,
} from "@/types/tracker/Tracker";
import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import { trackerRepo } from "@/api/trackerRepo";

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
      onLoad: (trackerId: number) => Promise<void>;
      updateTracker: (fn: (tracker: TrackerType) => TrackerType) => void;
      updateComponent: (
        fn: (comp: TrackerComponentType) => TrackerComponentType,
      ) => void;
      deleteComponent: (id: number) => void;
    }
  | undefined
>(undefined);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [tracker, setTracker] = useState<TrackerType | null>(
    TrackerTypeDefaultValue,
  );
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(
    null,
  );

  const onLoad = useCallback(async (trackerId: number) => {
    try {
      const result = await trackerRepo.GetById(trackerId);
      setTracker(result.data);
    } catch {
      setTracker(null);
    }
  }, []);

  const updateTracker = useCallback(
    (fn: (tracker: TrackerType) => TrackerType) => {
      setTracker((t) => {
        if (!t) return t;
        return fn(t);
      });
    },
    [],
  );

  const updateComponent = useCallback(
    (fn: (comp: TrackerComponentType) => TrackerComponentType) => {
      if (selectedComponentId == null) return;

      setTracker((prev) => {
        if (!prev) return prev;

        const index = prev.components.findIndex(
          (c) => c.id === selectedComponentId,
        );

        if (index === -1) return prev;

        const updated = fn(prev.components[index]);

        const newComponents = [...prev.components];
        newComponents[index] = updated;

        return {
          ...prev,
          components: newComponents,
        };
      });
    },
    [selectedComponentId],
  );

  const deleteComponent = useCallback((id: number) => {
    setTracker((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        components: prev.components.filter((c) => c.id !== id),
      };
    });

    setSelectedComponentId((current) => (current === id ? null : current));
  }, []);

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
      onLoad,
      updateTracker,
      updateComponent,
      deleteComponent,
    }),
    [
      setSelectedComponentId,
      onLoad,
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
