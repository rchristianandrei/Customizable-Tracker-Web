import { trackerRepo } from "@/api/trackerRepo";
import type { TrackerType } from "@/types/tracker/Tracker";
import { useCallback, useState } from "react";

export const useTracker = () => {
  const [tracker, setTracker] = useState<TrackerType | null>(null);

  const getTracker = useCallback(async (trackerId: number) => {
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

  return {
    tracker,
    setTracker,
    getTracker,
    updateTracker,
  };
};
