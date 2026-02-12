import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTrackerState, useTrackerActions } from "@/contexts/TrackerContext";
import { TrackerComponent } from "@/components/Tracker/Tracker";
import { Layout } from "@/components/Layout";
import { TopBar } from "@/pages/manage-tracker/edit-tracker/TopBar";
import { SettingsBar } from "@/pages/manage-tracker/edit-tracker/editor/SettingsBar";
import { Header } from "@/components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function EditTracker() {
  const { id } = useParams();
  const { tracker, selectedComponent } = useTrackerState();
  const { setSelectedComponentId, getTracker } = useTrackerActions();

  useEffect(() => {
    getTracker(Number(id));
  }, []);

  return (
    <Layout>
      <Header title="Edit Tracker"></Header>
      {tracker && (
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="15%" minSize="15%" className="min-w-20">
            Components
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize="50%" className="flex flex-col">
            <TopBar></TopBar>
            <div className="flex-1 flex items-center justify-center">
              <TrackerComponent
                tracker={tracker}
                selectedComponentId={selectedComponent?.id}
                onComponentClick={setSelectedComponentId}
              ></TrackerComponent>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="15%" minSize="15%" className="p-2">
            <SettingsBar></SettingsBar>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      {!tracker && <div>Tracker Not Found</div>}
    </Layout>
  );
}
