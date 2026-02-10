import { TrackerComponent } from "@/components/Tracker/Tracker";
import { TopBar } from "@/pages/manage-tracker/edit-tracker/TopBar";
import { SettingsBar } from "@/pages/manage-tracker/edit-tracker/SettingsBar";
import { Layout } from "@/components/Layout";
import { useEffect } from "react";
import { TrackerRepo } from "@/api/trackerRepo";
import { useTracker } from "@/contexts/TrackerContext";

export function EditTracker() {
  const { tracker, setTracker } = useTracker();

  useEffect(() => {
    const id = 1;
    const result = TrackerRepo.GetById(id);
    setTracker(result);
  }, []);

  return (
    <Layout>
      {tracker && (
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
      )}
      {!tracker && <div>Tracker Not Found</div>}
    </Layout>
  );
}
