import { TrackerComponent } from "@/components/Tracker/Tracker";
import { TrackerProvider } from "@/contexts/TrackerContext";
import { TrackerSettings } from "@/pages/manage-tracker/TrackerSettings";
import { TopBar } from "@/pages/manage-tracker/TopBar";

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
            <TrackerSettings></TrackerSettings>
          </section>
        </section>
      </section>
    </TrackerProvider>
  );
}
