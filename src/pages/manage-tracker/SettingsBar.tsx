import { useTracker } from "@/contexts/TrackerContext";
import { ComponentSettings } from "@/pages/manage-tracker/ComponentSettings";
import { TrackerSettings } from "@/pages/manage-tracker/TrackerSettings";

export function SettingsBar() {
  const { selectedComponent } = useTracker();

  if (selectedComponent) return <ComponentSettings></ComponentSettings>;

  return <TrackerSettings></TrackerSettings>;
}
