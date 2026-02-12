import type { TrackerComponentType } from "@/types/tracker/components/TrackerComponent";
import type { TrackerType } from "@/types/tracker/Tracker";
import { useCallback, useState } from "react";

export const useComponent = (
  setTracker: React.Dispatch<React.SetStateAction<TrackerType | null>>,
) => {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(
    null,
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

  return {
    selectedComponentId,
    setSelectedComponentId,
    updateComponent,
    deleteComponent,
  };
};
