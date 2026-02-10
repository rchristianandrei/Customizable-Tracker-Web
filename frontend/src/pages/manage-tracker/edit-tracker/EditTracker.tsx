import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { trackerRepo } from "@/api/trackerRepo";
import { useTracker } from "@/contexts/TrackerContext";
import { TrackerComponent } from "@/components/Tracker/Tracker";
import { Layout } from "@/components/Layout";
import { TopBar } from "@/pages/manage-tracker/edit-tracker/TopBar";
import { SettingsBar } from "@/pages/manage-tracker/edit-tracker/editor/SettingsBar";

export function EditTracker() {
  const { id } = useParams();
  const { tracker, setTracker } = useTracker();

  useEffect(() => {
    async function OnLoad() {
      try {
        const result = await trackerRepo.GetById(Number(id));
        const data = result.data;
        setTracker(data);
      } catch (err) {
        setTracker(null);
      }
    }
    OnLoad();
  }, []);

  return (
    <Layout>
      {tracker && (
        <section className="h-full overflow-auto flex flex-row">
          <section className="flex-1 overflow-auto flex flex-col">
            <TopBar></TopBar>
            <div className="flex-1 flex items-center justify-center">
              <TrackerComponent tracker={tracker}></TrackerComponent>
            </div>
          </section>
          <section className="border-l border-foreground w-100 p-2">
            <SettingsBar></SettingsBar>
          </section>
        </section>
      )}
      {!tracker && <div>Tracker Not Found</div>}
    </Layout>
  );
}
