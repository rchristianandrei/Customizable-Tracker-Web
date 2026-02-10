import { TrackerComponent } from "@/components/Tracker/Tracker";
import { TrackerProvider } from "@/contexts/TrackerContext";
import { TopBar } from "@/pages/manage-tracker/edit-tracker/TopBar";
import { SettingsBar } from "@/pages/manage-tracker/edit-tracker/SettingsBar";
import { Layout } from "@/components/Layout";

export function EditTracker() {
  return (
    <TrackerProvider>
      <Layout>
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
      </Layout>
    </TrackerProvider>
  );
}
