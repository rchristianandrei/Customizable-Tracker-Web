import { TrackerComponent } from "@/components/Tracker/Tracker";
import { TrackerProvider } from "@/contexts/TrackerContext";
import { TopBar } from "@/pages/manage-tracker/TopBar";
import { SettingsBar } from "@/pages/manage-tracker/SettingsBar";

export function ManageTracker() {
  return (
    <TrackerProvider>
      <section className="h-full flex flex-col">
        <TopBar></TopBar>
        <section className="flex-1 overflow-auto flex flex-row">
          <section className="flex-1 overflow-auto flex items-center justify-center">
            <TrackerComponent></TrackerComponent>
          </section>
          <section className="border-l border-foreground w-100 p-2">
            <SettingsBar></SettingsBar>
          </section>
        </section>
      </section>
    </TrackerProvider>
  );
}
