import { useTrackerState } from "@/contexts/TrackerContext";
import { ComponentSettings } from "@/pages/manage-tracker/edit-tracker/editor/ComponentSettings";
import { TrackerSettings } from "@/pages/manage-tracker/edit-tracker/editor/TrackerSettings";

export function SettingsBar() {
  const { selectedComponent } = useTrackerState();

  if (selectedComponent) return <ComponentSettings></ComponentSettings>;

  return <TrackerSettings></TrackerSettings>;
}
