import { useCustomDnd } from "@/contexts/CustomDndContext";
import {
  useEditTrackerActions,
  useEditTrackerState,
} from "@/contexts/EditTrackerContext";
import { ComponentSettings } from "@/pages/manage-tracker/edit-tracker/editor/ComponentSettings";
import { TrackerSettings } from "@/pages/manage-tracker/edit-tracker/editor/TrackerSettings";
import { useEffect } from "react";

export function SettingsBar() {
  const { selectedComponent } = useEditTrackerState();
  const { setSelectedComponentId } = useEditTrackerActions();
  const { onDragStart } = useCustomDnd();

  useEffect(() => {
    if (onDragStart.id === 0) return;
    setSelectedComponentId(onDragStart.id);
  }, [onDragStart]);

  if (selectedComponent) return <ComponentSettings></ComponentSettings>;

  return <TrackerSettings></TrackerSettings>;
}
