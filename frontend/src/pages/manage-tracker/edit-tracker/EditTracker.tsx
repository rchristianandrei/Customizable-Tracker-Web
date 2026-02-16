import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useEditTrackerState,
  useEditTrackerActions,
} from "@/contexts/EditTrackerContext";
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
import { TrackerComponentProvider } from "@/contexts/TrackerContext";
import { CustomDndProvider } from "@/contexts/CustomDndContext";
import { Components } from "@/pages/manage-tracker/edit-tracker/editor/left-side-bar/Components";

export function EditTracker() {
  const { id } = useParams();
  const { tracker, selectedComponent } = useEditTrackerState();
  const { getTracker } = useEditTrackerActions();

  useEffect(() => {
    getTracker(Number(id));
  }, []);

  return (
    <CustomDndProvider>
      <Layout>
        <Header title="Edit Tracker"></Header>
        {tracker && (
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel
              defaultSize="15%"
              minSize="15%"
              className="min-w-20"
            >
              <Components></Components>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize="50%" className="flex flex-col">
              <TopBar></TopBar>
              <div className="flex-1 flex items-center justify-center">
                <TrackerComponentProvider>
                  <TrackerComponent
                    tracker={tracker}
                    currentSelectedComponentId={selectedComponent?.id}
                  ></TrackerComponent>
                </TrackerComponentProvider>
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
    </CustomDndProvider>
  );
}
